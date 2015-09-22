/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, S. Chris Colbert
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';

import {
  SplitPanel
} from 'phosphor-splitpanel';

import {
  ResizeMessage, Widget, attachWidget
} from 'phosphor-widget';

import './index.css';


declare var app: any;


function main(): void {

  var nWidgets = 2;

  var split = new SplitPanel();
  split.id = 'main';

  for (var i = 0; i < nWidgets; i++) {
    var widget = new Widget();
    widget.addClass('todoapp');
    widget.addClass('content');
    split.addChild(widget);
  }
  attachWidget(split, document.body);

  function render(model: any, node: HTMLElement) {
    function render() {
      React.render(
          React.createElement(app.TodoApp, {model: model}),
          node
      );
    }
    model.subscribe(render);
    render();
  }

  var models: any = [];

  // Wait for the JSX to load
  setTimeout(() => { 
    for (var i = 0; i < split.children.length; i++) {
      var model = new app.TodoModel('react-todos-' + String(i));
      var widget = split.childAt(i);
      render(model, widget.node);
      models.push(model);
    }
   }, 100);

  window.onresize = () => split.update();
}


window.onload = main;
