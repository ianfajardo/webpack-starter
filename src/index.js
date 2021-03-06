import _ from 'lodash';
import './scss/style.scss';
import printMe from './print.js';
import './react/app.jsx';

function component() {
  var element = document.createElement('div');
	var btn = document.createElement('button');
	
  // Lodash, now imported by this script
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
	element.classList.add('hello');
	
	btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;
	
	element.appendChild(btn);
	
  return element;
}

document.body.appendChild(component());