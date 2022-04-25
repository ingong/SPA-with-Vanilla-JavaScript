import '@/components/Animation/style/index.css';
import { debounce } from './helper';
import BaseBallImg from '@/assets/readme/BaseBall.png';

const ENUM = {
  maxWidth: 97,
  distance: 3,
  incrementor: 10,
  minimum: 10,
};

export default class AnimationPage {
  constructor() {
    this.elementCount = ENUM.minimum;
    this.isOptimize = false;
    this.isWorking = true;

    this.$root = document.querySelector('#root');
    this.initBaseTemplate();
    this.$proto = document.querySelector('.proto');
    this.$subtract = document.querySelector('.subtract');
    this.$add = document.querySelector('.add');

    this.movers;
    this.frame;

    this.bodySize = document.body.getBoundingClientRect();
    this.ballSize = this.$proto.getBoundingClientRect();
    this.maxHeight = Math.floor(this.bodySize.height - this.ballSize.height);

    this.addEvent();
    this.setup();
    this.initApp();
    this.initFrame();
  }

  setup() {
    this.$add.textContent = 'Add ' + ENUM.incrementor;
    this.$subtract.textContent = 'Subtract ' + ENUM.incrementor;
    this.$root.removeChild(this.$proto);
    this.$proto.classList.remove('.proto');
  }

  initBaseTemplate() {
    const template = `
      <img class="proto mover" src=${BaseBallImg}/>
      <div class="controls">
        <button class="add"></button>
        <button class="subtract" disabled></button>
        <button class="stop">Stop</button>
        <button class="optimize">Optimize</button>
        <a href=https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/"
          target="_blank">
          <button class="optimize">Help</button>
        </a>
      </div>
    `;
    this.$root.innerHTML = template;
  }

  initApp() {
    this.bodySize = document.body.getBoundingClientRect();
    this.ballSize = this.$proto.getBoundingClientRect();
    this.maxHeight = Math.floor(this.bodySize.height - this.ballSize.height);

    if (this.movers) {
      this.bodySize = document.body.getBoundingClientRect();
      document.querySelectorAll('.mover').forEach((node) => node.remove());
      this.$root.appendChild(this.$proto);
      this.ballSize = this.$proto.getBoundingClientRect();
      this.$root.removeChild(this.$proto);
      this.maxHeight = Math.floor(this.bodySize.height - this.ballSize.height);
    }

    for (let index = 0; index < this.elementCount; index++) {
      const clonedNode = this.$proto.cloneNode();
      const top = Math.floor(Math.random() * this.maxHeight);

      if (top === this.maxHeight) clonedNode.classList.add('up');
      else clonedNode.classList.add('down');

      clonedNode.style.left = index / (this.elementCount / ENUM.maxWidth) + 'vw';
      clonedNode.style.top = top + 'px';
      this.$root.appendChild(clonedNode);
    }
    this.movers = document.querySelectorAll('.mover');
  }
  initFrame() {
    this.frame = window.requestAnimationFrame(this.update.bind(this));
  }
  handleStop({ target }) {
    if (this.isWorking) {
      cancelAnimationFrame(this.frame);
      target.textContent = 'Start';
      this.isWorking = false;
    } else {
      this.frame = window.requestAnimationFrame(this.update.bind(this));
      target.textContent = 'Stop';
      this.isWorking = true;
    }
  }
  handleOptimize({ target }) {
    if (target.textContent === 'Optimize') {
      this.isOptimize = true;
      target.textContent = 'Un-Optimize';
    } else {
      this.isOptimize = false;
      target.textContent = 'Optimize';
    }
  }
  handleAddBtn() {
    cancelAnimationFrame(this.frame);
    this.elementCount += ENUM.incrementor;
    this.initApp.apply(this);
    if (this.elementCount > ENUM.minimum) this.$subtract.disabled = false;
    else this.$subtract.disabled = true;
    this.frame = requestAnimationFrame(this.update.bind(this));
  }
  handleSubtractBtn() {
    cancelAnimationFrame(this.frame);
    this.elementCount -= ENUM.incrementor;
    this.initApp.apply(this);
    if (this.elementCount <= ENUM.minimum) this.$subtract.disabled = true;
    else this.$subtract.disabled = false;
    this.frame = requestAnimationFrame(this.update.bind(this));
  }
  handleResize() {
    if (this.isWorking) {
      cancelAnimationFrame(this.frame);
      this.initApp.apply(this);
      this.frame = requestAnimationFrame(this.update.bind(this));
    }
  }
  addEvent() {
    document.querySelector('.stop').addEventListener('click', this.handleStop.bind(this));
    document.querySelector('.optimize').addEventListener('click', this.handleOptimize.bind(this));
    this.$add.addEventListener('click', this.handleAddBtn.bind(this));
    this.$subtract.addEventListener('click', this.handleSubtractBtn.bind(this));
    window.addEventListener(
      'resize',
      debounce(() => this.handleResize.apply(this), 500),
    );
  }
  update() {
    for (let index = 0; index < this.elementCount; index++) {
      const element = this.movers[index];
      if (!this.isOptimize) {
        let pos = element.classList.contains('down') ? element.offsetTop + ENUM.distance : element.offsetTop - ENUM.distance;
        if (pos < 0) pos = 0;
        else if (pos > this.maxHeight) pos = this.maxHeight;
        element.style.top = pos + 'px';

        if (element.offsetTop === 0) {
          element.classList.remove('up');
          element.classList.add('down');
        } else if (element.offsetTop === this.maxHeight) {
          element.classList.remove('down');
          element.classList.add('up');
        }
      } else {
        let pos = parseInt(element.style.top.slice(0, element.style.top.indexOf('px')));
        pos = element.classList.contains('down') ? (pos += ENUM.distance) : (pos -= ENUM.distance);

        if (pos < 0) pos = 0;
        else if (pos > this.maxHeight) pos = this.maxHeight;
        element.style.top = pos + 'px';

        if (pos === 0) {
          element.classList.remove('up');
          element.classList.add('down');
        } else if (pos === this.maxHeight) {
          element.classList.remove('down');
          element.classList.add('up');
        }
      }
    }
    this.frame = window.requestAnimationFrame(this.update.bind(this));
  }
}
