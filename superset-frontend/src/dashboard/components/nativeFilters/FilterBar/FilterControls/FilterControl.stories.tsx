/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React from 'react';
import { Provider } from 'react-redux';
import { css } from '@emotion/react';
import { getMockStoreWithNativeFilters } from 'spec/fixtures/mockStore';
import { buildNativeFilter } from 'spec/fixtures/mockNativeFilters';
import FilterControl from './FilterControl';
import { FilterProps } from './types';

export default {
  title: 'FilterControl',
  component: FilterControl,
};

const store = getMockStoreWithNativeFilters();
export const VerticalFilterControl = (props: FilterProps) => (
  <Provider store={store}>
    <div
      css={css`
        background-color: #ddd;
        padding: 50px;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          width: 259px;
          padding: 16px;
          background-color: white;
        `}
      >
        <FilterControl {...props} />
      </div>
    </div>
  </Provider>
);

// export const HorizontalFilterControl = (props: FilterProps) => (
//   <div
//     css={css`
//       background-color: #ddd;
//       padding: 50px;
//     `}
//   >
//     <div
//       css={css`
//         height: 48px;
//         padding: 0 16px;
//         display: flex;
//         align-items: center;
//         background-color: white;
//       `}
//     >
//       <FilterControl horizontal {...props} />
//     </div>
//   </div>
// );

// export const HorizontalOverflowFilterControl = (props: FilterProps) => (
//   <div
//     css={css`
//       background-color: #ddd;
//       padding: 50px;
//     `}
//   >
//     <div
//       css={css`
//         width: 224px;
//         padding: 16px;
//         background-color: white;
//       `}
//     >
//       <FilterControl {...props} />
//     </div>
//   </div>
// );

VerticalFilterControl.args = {
  onFilterSelectionChange: () => null,
  filter: buildNativeFilter('1', 'column_name', []),
};

VerticalFilterControl.story = { parameters: { knobs: { disable: true } } };

// HorizontalFilterControl.args = {
//   ...args,
//   horizontal: true,
//   overflow: false,
// };

// HorizontalFilterControl.story = story;

// HorizontalOverflowFilterControl.args = {
//   ...args,
//   horizontal: true,
//   overflow: true,
// };

// HorizontalOverflowFilterControl.story = story;
