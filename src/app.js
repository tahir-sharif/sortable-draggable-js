const parent = document.querySelector('.sortable-container');
const sections = document.querySelectorAll('section');

// Sample
[].forEach((item, i) => {
  const div = document.createElement('div');
  div.classList.add('fallback-element');
  div.innerHTML = 'I am tahir';
  div.onclick = () => alert('fallback orignal');

  const sortable = new Sortable(item, {
    itemClass: 'item-class', // class applies to every sortable element
    draggingClass: 'dargging', // class will apply when dragging start
    zoom: 1, // it is viewport zoom value (if have css zoom property)
    disabledClass: 'disabled', // class will apply if sorting is disable
    containers: 'sort-container', // comma seperated appendable boxes classes
    preventedContainers: 'another-conatiner', // comma seperated prevented boxes classes
    fallBackElement: item.classList.contains('fallback') // it is not sortable, it just append this fallback html
      ? `<div class="fallback-element">
         <span>I am fallback</span>
         </div>`
      : null,
    handle: true,
    fallBackClone: false, // if will drop a clone of fallback element
    onStart: (startDetail) => {
      // it will trigger when you start sorting
      console.log(startDetail);
    },
    onDrop: (details) => {
      // it will trigger after dropped even it is sorted or not
      console.log(details);
    },
    onSort: (details) => {
      // if element has change or sorted it takes gurantee to trigger after sorting
      console.log(details);
    }
  });
  sortable.disable();
});

// Section 1 - Example
const section1Divs = sections[0]?.querySelectorAll('.sortable-container .sort');
section1Divs.forEach((item, i) => {
  const sortable = new Sortable(item);
});

// Section 2 - multiple boxes
const section2Divs = sections[1]?.querySelectorAll('.sort');
section2Divs.forEach((item, i) => {
  const sortable = new Sortable(item, {
    containers: 'sort-container' // comma seperated appendable boxes classes,
  });
});

// Section 3 - containers
const section3Divs = sections[2]?.querySelectorAll('.sort');
section3Divs.forEach((item, i) => {
  const sortable = new Sortable(item, {
    containers: 'sort-container' // comma seperated appendable boxes classes,
  });
});

// Section 4 - prevented container
const section4Divs = sections[3]?.querySelectorAll('.sort');
section4Divs.forEach((item, i) => {
  const sortable = new Sortable(item, {
    containers: 'sort-container,school-container', // comma seperated appendable boxes classes,
    preventedContainers: !item.classList.contains('can-go')
      ? 'school-container'
      : ''
  });
});

// Section 5 - fallback
const section5Divs = sections[4]?.querySelectorAll('.fallback');
section5Divs.forEach((item, i) => {
  const sortable = new Sortable(item, {
    containers: 'sort-container', // comma seperated appendable boxes classes,
    fallBackElement: `<div class="fallback-element">
  <span>I am fallback</span>
  </div>`,
    fallBackClone: !item.classList.contains('Without-clone')
  });
});

// Section 6 - zoom
const section6Divs = sections[5]?.querySelectorAll('.sortable-container');
section6Divs[0].querySelectorAll('.sort').forEach((item, i) => {
  const sortable = new Sortable(item);
});
section6Divs[1].querySelectorAll('.sort').forEach((item, i) => {
  const sortable = new Sortable(item, {
    zoomedElement: item.closest('.containers-example')
  });
});

// Section 7 - disable
const section7Divs = sections[6]?.querySelectorAll('.sortable-container .sort');
section7Divs.forEach((item, i) => {
  const sortable = new Sortable(item, {
    disabledClass: 'disabled'
  });
  if (i % 2 === 0) {
    const oldHTML = item.innerHTML;
    sortable.disable();
    item.innerHTML = 'Click me to Re-Enable';

    const reEnable = () => {
      sortable.disable(false);
      item.removeEventListener('click', reEnable);
      item.innerHTML = oldHTML;
    };

    item.addEventListener('click', reEnable);
  }
});

// Section 7 - handle
const section8Divs = sections[7]?.querySelectorAll('.sortable-container');

section8Divs[0].querySelectorAll('.sort').forEach((item, i) => {
  const sortable = new Sortable(item, {
    handle: true
  });
});
section8Divs[1].querySelectorAll('.sort').forEach((item, i) => {
  const sortable = new Sortable(item, {
    handle:
      i % 2 !== 0
        ? '👀'
        : `<img style="width:50px; filter:invert(1)" src="https://img.freepik.com/free-icon/move_318-183631.jpg?w=200" />`
  });
});

// section 9 -options
// options viewer
const highlight = (tr) => {
  // after scroll
  if (tr) {
    setTimeout(() => {
      tr.style.background = '#03668b';
      tr.style.transition = '0.3s';
      // reset
      setTimeout(() => {
        tr.style.background = '';
      }, 500);
    }, 800);
  }
};

document.querySelectorAll("a[href*='#']").forEach((a) => {
  a.onclick = () => {
    const id = a.href?.split('#').pop();
    const tr = document.getElementById(id)?.closest('tr');
    highlight(tr);
  };
});

// Javascript code viewer
const getCopyButton = (textToCopy = '') => {
  const button = document.createElement('button');
  button.classList.add('copy-btn');
  const copyTxt = 'copy';
  const copiedTxt = 'copied';

  const makeCopyAble = () => {
    button.innerText = copyTxt;
    button.addEventListener('click', copyListener);
  };

  const copyListener = () => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      button.innerText = copiedTxt;
      button.removeEventListener('click', copyListener);

      setTimeout(() => {
        makeCopyAble();
      }, 1000);
    });
  };
  makeCopyAble();
  return button;
};

document.addEventListener('DOMContentLoaded', () => {
  // Formating code
  document.querySelectorAll('pre code').forEach((el) => {
    const attrCls =
      [...el.classList].find((cl) => cl.includes('bs-')) || 'bs-javascript';
    const language = attrCls.split('bs-').pop();
    const code = el.innerHTML;
    const html = Prism.highlight(code, Prism.languages[language], language);
    if (html) {
      el.innerHTML = html;
    }

    const copyBtn = getCopyButton(code);
    el.append(copyBtn);
  });
  // adding zoom listener
  document
    .querySelector('input[type=checkbox]')
    .addEventListener('change', (e) => {
      const container = e.target
        .closest('section')
        .querySelector('.containers-example');
      if (e.target.checked) {
        container.style.zoom = 0.5;
      } else {
        container.style.zoom = '';
      }
    });
  // if url has hashtag then highlight option
  if (window.location.hash) {
    highlight(document.querySelector(window.location.hash).closest('tr'));
  }
});
