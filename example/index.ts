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
declare var React: any;
declare var TodoApp: any;


function main(): void {
  var model0 = new app.TodoModel('react-todos-0');
  var model1 = new app.TodoModel('react-todos-1');

  function render0() {
    React.render(
        React.createElement(app.TodoApp, {model: model0}),
        document.getElementsByClassName('todoapp')[0]
    );
  }

  function render1() {
    React.render(
        React.createElement(app.TodoApp, {model: model1}),
        document.getElementsByClassName('todoapp')[1]
    );
  }

  model0.subscribe(render0);
  model1.subscribe(render1);

  var todoWidget = new Widget();
  todoWidget.addClass('todoapp');
  todoWidget.addClass('content');

  var otherWidget = new Widget();
  otherWidget.addClass('content');
  otherWidget.addClass('todoapp');

  var split = new SplitPanel();

  split.children = [todoWidget, otherWidget];

  attachWidget(split, document.body);

  render0();
  render1();

  window.onresize = () => split.update();
}


window.onload = main;
