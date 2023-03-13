# sortable-draggable-js.

Streamline your web development with Sortable-Draggable-JS – the ultimate JavaScript library for effortlessly sorting and dragging items on your web page. With its intuitive drag-and-drop functionality, you can easily create custom, reorderable lists that enhance user experience and streamline your workflow.

Demo : https://tahir-sharif.github.io/sortable-draggable-js

## Getting Started

Install with NPM:

```
$ npm install sortable-draggable-js --save
```

Import into your project:

```javascript
import Sortable from 'sortable-draggable-js';
```

Or connect a CDN link (Coming soon)

```javascript
<script src="https://github.com/tahir150/sortable-draggable-js/edit/master/README.md"></script>
```

## Usage

```html
<div class="sortable-container">
  <div class="sort">
    <span>Hello I am a Element 1</span>
  </div>
  <div class="sort">
    <span>Hello I am a Element 2</span>
  </div>
  <div class="sort">
    <span>Hello I am a Element 3</span>
  </div>
  <div class="sort">
    <span>Hello I am a Element 4</span>
  </div>
</div>
```

```javascript
const elements = document.querySelectorAll('.sort');
divsToSort.forEach((item) => {
  const sortable = new Sortable(item);
});
```

## Options

Options object can be assign by giving second argument.

```javascript
const sortable = new Sortable(item, {
  itemClass: 'item-class', // class applies to every sortable element
  draggingClass: 'dargging', // class will apply when dragging start
  disabledClass: 'disabled', // class will apply if sorting is disable
  zoom: 1, // it is viewport zoom value (if have css zoom property)
  containers: 'sort-container', // comma seperated appendable boxes classes
  fallBackElement: item.classList.contains('fallback') // it is not sortable, it just append this fallback html
    ? `<div class="fallback-element">
         <span>I am fallback</span>
         </div>`
    : null,
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
```

### `itemClass` option

It will add a class to every sortable Item

### `draggingClass` option

When Sortable Item starts dragging for sorting, the class will applied and when sorted or cancel sorted, the class will be removed.

### `disabledClass` option

When you disable any element, the class will be applied until you re-enable it.

### `zoom` option

If your body or main container has CSS zoom property or transform scale, you will need to give zoom value which help to drag perfectly.

### `containers` option

It takes css comma seperated classes of div's containers.It will allow the item to drop into zontainer while sorting.

### `fallBackElement` option

It takes HTML DOM object or HTML string, It is fallback Element which will drop into your container.To work with this, container is required. It will not drop the Real sorting Element, It will drop your fallback which you've passed to it.

### `fallBackClone` option

It takes Boolean value (defaults to true). It will drop a clone of your fallback Element.

## Contributing

We welcome contributions from everyone!

### Bug Reports and Feature Requests

Please use the [issue tracker](https://github.com/tahir-sharif/sortable-draggable-js/issues) to report any bugs or request new features.

### Contributors

Thank you to all the contributors who have helped make this project better! You can find a list of contributors [here](https://github.com/tahir-sharif/sortable-draggable-js/graphs/contributors).
