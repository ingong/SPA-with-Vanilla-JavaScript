import '@/pages/Animation/style/index.css';
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
    this.animationState = 'idle';

    this.$root = document.querySelector('#root');
    this.initBaseTemplate();
    this.$proto = document.querySelector('.proto');
    this.$stopBtn = document.querySelector('.stop');
    this.$subtractBtn = document.querySelector('.subtract');
    this.$addBtn = document.querySelector('.add');
    this.$idleBtn = document.querySelector('.idle');
    this.$optWithrAFBtn = document.querySelector('.optWithrAF');
    this.$optWithKeyFrameBtn = document.querySelector('.optWithKeyFrame');

    this.movers;
    this.frame;

    this.bodySize = document.body.getBoundingClientRect();
    this.ballSize = this.$proto.getBoundingClientRect();
    this.maxHeight = Math.floor(this.bodySize.height - this.ballSize.height);

    this.addEvent();
    this.setup();
    this.initApp();
    this.initFrameWithrAF();
  }
  setup() {
    this.$addBtn.textContent = 'Add ' + ENUM.incrementor;
    this.$subtractBtn.textContent = 'Subtract ' + ENUM.incrementor;
    this.$root.removeChild(this.$proto);
  }
  initBaseTemplate() {
    const template = `
      <img class="proto mover" src=${BaseBallImg}/>
      <div class="controls">
        <button class="add"></button>
        <button class="subtract" disabled></button>
        <button class="stop">Stop</button>
        <button class="optWithrAF">optWithrAF</button>
        <button class="optWithKeyFrame">optWithKeyFrame</button>
        <button class="idle" disabled>idle</button>
      </div>
    `;
    this.$root.insertAdjacentHTML('beforeend', template);
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
      const top = this.animationState === 'optWithKeyFrame' ? this.maxHeight : Math.floor(Math.random() * this.maxHeight);
      console.log('top', top);

      if (top === this.maxHeight) clonedNode.classList.add('up');
      else clonedNode.classList.add('down');

      clonedNode.style.left = index / (this.elementCount / ENUM.maxWidth) + 'vw';
      clonedNode.style.top = top + 'px';
      this.$root.appendChild(clonedNode);
    }
    this.movers = document.querySelectorAll('.mover');
  }
  initFrameWithrAF() {
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
  handleOptimize({ target }) {}
  handleAddBtn() {
    // 상태
    cancelAnimationFrame(this.frame);
    this.elementCount += ENUM.incrementor;
    this.initApp.apply(this);
    if (this.elementCount > ENUM.minimum) this.$subtract.disabled = false;
    else this.$subtract.disabled = true;
    this.frame = requestAnimationFrame(this.update.bind(this));
  }
  handleSubtractBtn() {
    // 상태
    cancelAnimationFrame(this.frame);
    this.elementCount -= ENUM.incrementor;
    this.initApp.apply(this);
    if (this.elementCount <= ENUM.minimum) this.$subtract.disabled = true;
    else this.$subtract.disabled = false;
    this.frame = requestAnimationFrame(this.update.bind(this));
  }
  handleResize() {
    if (this.isWorking && this.animationState !== 'optWithKeyFrame') {
      cancelAnimationFrame(this.frame);
      this.initApp.apply(this);
      this.frame = requestAnimationFrame(this.update.bind(this));
    }
  }
  addEvent() {
    this.$stopBtn.addEventListener('click', this.handleStop.bind(this));
    this.$addBtn.addEventListener('click', this.handleAddBtn.bind(this));
    this.$subtractBtn.addEventListener('click', this.handleSubtractBtn.bind(this));
    this.$idleBtn.addEventListener('click', this.handleOptimize.bind(this));
    this.$optWithrAFBtn.addEventListener('click', this.handleOptimize.bind(this));
    this.$optWithKeyFrameBtn.addEventListener('click', this.handleOptimize.bind(this));
    window.addEventListener(
      'resize',
      debounce(() => this.handleResize.apply(this), 500),
    );
    window.addEventListener('popstate', () => cancelAnimationFrame(this.frame));
  }

  updateIdleState() {}
  updateOptWithrAFState() {}
  updateOptWithKeyFrameState() {}

  update() {
    // 상태: idle, optWithrAF, optWithKeyFrame
    for (let index = 0; index < this.elementCount; index++) {
      const element = this.movers[index];
      let pos;

      switch (this.animationState) {
        case 'idle':
          pos = element.classList.contains('down') ? element.offsetTop + ENUM.distance : element.offsetTop - ENUM.distance;
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
          break;
        case 'optWithrAF':
          pos = parseInt(element.style.top.replace(/\px/, ''));
          pos = element.classList.contains('down') ? pos + ENUM.distance : pos - ENUM.distance;
          pos = pos < 0 ? 0 : pos > this.maxHeight ? this.maxHeight : pos;
          element.style.top = pos + 'px';

          if (pos === 0) {
            element.classList.remove('up');
            element.classList.add('down');
          } else if (pos === this.maxHeight) {
            element.classList.remove('down');
            element.classList.add('up');
          }
          break;
        case 'optWithKeyFrame':
          pos = parseInt(element.style.top.replace(/\px/, ''));
          pos = element.classList.contains('down') ? pos + ENUM.distance : pos - ENUM.distance;
          pos = pos < 0 ? 0 : pos > this.maxHeight ? this.maxHeight : pos;
          element.style.top = pos + 'px';

          if (pos === 0) {
            element.classList.remove('up');
            element.classList.add('down');
          } else if (pos === this.maxHeight) {
            element.classList.remove('down');
            element.classList.add('up');
          }
          break;
        default:
          break;
      }
    }
    if (this.animationState !== 'optWithKeyFrame') this.frame = window.requestAnimationFrame(this.update.bind(this));
  }
}
