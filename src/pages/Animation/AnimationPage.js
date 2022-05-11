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
        <button class="idle" disabled>idle</button>
        <button class="optWithrAF">optWithrAF</button>
        <button class="optWithKeyFrame">optWithKeyFrame</button>
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
      if (top === this.maxHeight) clonedNode.classList.add('up');
      else clonedNode.classList.add('down');
      clonedNode.style.left = index / (this.elementCount / ENUM.maxWidth) + 'vw';
      clonedNode.style.top = top + 'px';
      this.$root.appendChild(clonedNode);
    }
    this.movers = document.querySelectorAll('.mover');
  }
  initFrameWithrAF() {
    this.frame && cancelAnimationFrame(this.frame);
    this.frame = window.requestAnimationFrame(this.update.bind(this));
  }
  addEvent() {
    this.$stopBtn.addEventListener('click', this.handleisWorking.bind(this));
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
  handleisWorking({ target }) {
    if (this.isWorking) {
      switch (this.animationState) {
        case 'idle':
          cancelAnimationFrame(this.frame);
          target.textContent = 'Start';
          this.isWorking = false;
          break;
        case 'optWithrAF':
          cancelAnimationFrame(this.frame);
          target.textContent = 'Start';
          this.isWorking = false;
          break;
        case 'optWithKeyFrame':
          this.removeKeyFrameAnimation();
          target.textContent = 'Start';
          this.isWorking = false;
          break;
        default:
          return;
      }
    } else {
      switch (this.animationState) {
        case 'idle':
          this.initFrameWithrAF();
          target.textContent = 'Stop';
          this.isWorking = true;
          break;
        case 'optWithrAF':
          this.initFrameWithrAF();
          target.textContent = 'Stop';
          this.isWorking = true;
          break;
        case 'optWithKeyFrame':
          target.textContent = 'Stop';
          this.isWorking = true;
          this.addKeyFrameAnimation();
          break;
        default:
          return;
      }
    }
  }
  handleAddBtn() {
    this.elementCount += ENUM.incrementor;
    this.animationState !== 'optWithKeyFrame' && cancelAnimationFrame(this.frame);
    this.initApp.apply(this);
    this.animationState !== 'optWithKeyFrame' && this.initFrameWithrAF();
    this.animationState === 'optWithKeyFrame' && this.addKeyFrameAnimation();
    this.changeSubtractBtnStatus();
  }
  handleSubtractBtn() {
    this.elementCount -= ENUM.incrementor;
    this.animationState !== 'optWithKeyFrame' && cancelAnimationFrame(this.frame);
    this.initApp.apply(this);
    this.animationState !== 'optWithKeyFrame' && this.initFrameWithrAF();
    this.animationState === 'optWithKeyFrame' && this.addKeyFrameAnimation();
    this.changeSubtractBtnStatus();
  }
  handleResize() {
    if (this.isWorking && this.animationState !== 'optWithKeyFrame') {
      cancelAnimationFrame(this.frame);
      this.initApp.apply(this);
      this.initFrameWithrAF();
    }
  }
  handleOptimize({ target }) {
    if (this.$idleBtn.disabled) this.$idleBtn.disabled = false;
    else if (this.$optWithrAFBtn.disabled) this.$optWithrAFBtn.disabled = false;
    else if (this.$optWithKeyFrameBtn.disabled) this.$optWithKeyFrameBtn.disabled = false;

    const type = target.textContent;
    this.$stopBtn.textContent = 'Stop';
    this.isWorking = true;

    switch (type) {
      case 'idle':
        if (this.animationState === 'optWithrAF') cancelAnimationFrame(this.frame);
        else if (this.animationState === 'optWithkeyFrame') this.removeKeyFrameAnimation();
        this.animationState = 'idle';
        this.$idleBtn.disabled = true;
        this.initApp.apply(this);
        this.initFrameWithrAF();
        break;
      case 'optWithrAF':
        if (this.animationState === 'idle') cancelAnimationFrame(this.frame);
        else if (this.animationState === 'optWithkeyFrame') this.removeKeyFrameAnimation();
        this.animationState = 'optWithrAF';
        this.$optWithrAFBtn.disabled = true;
        this.initApp.apply(this);
        this.initFrameWithrAF();
        break;
      case 'optWithKeyFrame':
        cancelAnimationFrame(this.frame);
        this.animationState = 'optWithKeyFrame';
        this.$optWithKeyFrameBtn.disabled = true;
        this.initApp.apply(this);
        this.addKeyFrameAnimation();
        break;
      default:
        break;
    }
  }

  update() {
    for (let index = 0; index < this.elementCount; index++) {
      const element = this.movers[index];
      const isLast = index === this.elementCount - 1;
      switch (this.animationState) {
        case 'idle':
          this.updateIdleState(element, isLast);
          break;
        case 'optWithrAF':
          this.updateOptWithrAFState(element, isLast);
          break;
        case 'optWithKeyFrame':
          this.updateOptWithKeyFrameState(element);
          break;
        default:
          return;
      }
    }
  }
  updateIdleState(element, isLast) {
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
    if (isLast) this.initFrameWithrAF();
  }
  updateOptWithrAFState(element, isLast) {
    let pos = parseInt(element.style.top.replace(/\px/, ''));
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
    if (isLast) this.initFrameWithrAF();
  }
  updateOptWithKeyFrameState(element) {
    element.style.top = '0px';
  }
  addKeyFrameAnimation() {
    document.querySelectorAll('.mover').forEach((node) => node.classList.add('csskeyframe'));
  }
  removeKeyFrameAnimation() {
    document.querySelectorAll('.mover').forEach((node) => node.classList.remove('csskeyframe'));
  }
  changeSubtractBtnStatus() {
    if (this.elementCount <= ENUM.minimum) this.$subtractBtn.disabled = true;
    else this.$subtractBtn.disabled = false;
  }
}
