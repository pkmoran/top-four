import React from 'react';
import { mount } from 'enzyme';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import DraggableTopics from '../DraggableTopics';

let wrapped;
const topics = [
  {
    uid: 'topic1',
    rank: -1,
    status: 'active',
    topic: 'topic 1'
  },
  {
    uid: 'topic2',
    rank: -1,
    status: 'active',
    topic: 'topic 2'
  },
  {
    uid: 'topic3',
    rank: -1,
    status: 'active',
    topic: 'topic 3'
  },
  {
    uid: 'topic4',
    rank: -1,
    status: 'active',
    topic: 'topic 4'
  }
];

beforeEach(() => {
  wrapped = mount(<DraggableTopics topics={topics} />);
});

afterEach(() => {
  wrapped.unmount();
});

it('should have a DragDropContext', () => {
  expect(wrapped.find(DragDropContext).length).toEqual(1);
});
