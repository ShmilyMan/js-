var that = null;

class Tab {
  constructor(className) {
    that = this;
    this.tab = document.querySelector(className);
    this.add = this.tab.querySelector('.add');

    // tab head
    this.ul = this.tab.querySelector('.tab_h');
    // tab body
    this.tab_bd = this.tab.querySelector('.tab-bd');
    this.init();
  }
  // 初始化函数
  init() {
    this.updataInfo();
    for (var i = 0; i < this.lis.length; i++) {
      this.lis[i].setAttribute('data-index', i);
      this.lis[i].addEventListener('click', this.tabToggle);
      this.dels[i].addEventListener('click', this.tabDel);
      this.spans[i].addEventListener('dblclick', this.tabEdit);
      this.bd_spans[i].addEventListener('dblclick', this.tabEdit);
    }

    // 增加
    this.add.addEventListener('click', this.tabAdd);
  }
  // 获取 lis 和 sections 。 dels 的元素
  updataInfo() {
    this.lis = this.tab.querySelectorAll('li');
    this.sections = this.tab.querySelectorAll('section');
    this.dels = this.tab.querySelectorAll('i');
    this.spans = this.tab.querySelectorAll('.tab_h span');
    this.bd_spans = this.tab.querySelectorAll('.tab-bd span');
  }
  // 切换
  tabToggle() {
    that.clearClassStyle();
    this.className = 'current';
    that.sections[this.dataset.index].className = 'show';
  }
  // 增加
  tabAdd() {
    that.clearClassStyle();
    var random = Math.random();
    var li = '<li class="current"><span>' + '新增选项卡' + '</span><i>x</i></li>';
    var section = '<section class="show"><span>' + '新增内容' + random + '</span></section>';
    that.ul.insertAdjacentHTML('beforeend', li);
    that.tab_bd.insertAdjacentHTML('beforeend', section);
    that.init();
  }
  // 删除
  tabDel(e) {
    e.stopPropagation();  // stop bubble to father
    var index = this.parentNode.dataset.index;
    that.lis[index].remove();
    that.sections[index].remove();
    if (that.tab.querySelector('.current')) return;
    index--;
    that.lis[index] && that.lis[index].click();
    that.init();
    if (!that.tab.querySelector('.current') && that.lis >= 0) that.lis[0].click();
  }
  // 修改
  tabEdit() {
    var str = this.innerHTML;
    // 双击禁止选定文字
    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    this.innerHTML = '<input type="text" />';
    var input = this.children[0];
    input.value = str;
    input.select();   // 使 input 默认为全部选中状态
    input.addEventListener('blur', function () {
      this.parentNode.innerHTML = input.value;
    })
    input.addEventListener('keyup', function (e) {
      if (e.keyCode === 13) {
        this.blur();
      }
    })
  }
  // 清空当前类的样式
  clearClassStyle() {
    for (var i = 0; i < this.lis.length; i++) {
      this.lis[i].className = '';
      this.sections[i].className = '';
    }
  }
}

new Tab('.tab');