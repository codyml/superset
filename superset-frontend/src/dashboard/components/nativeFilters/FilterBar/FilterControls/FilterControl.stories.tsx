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
import { NativeFilterType } from '@superset-ui/core';
import { getMockStoreWithNativeFilters } from 'spec/fixtures/mockStore';
import 'src/dashboard/stylesheets/index.less';
import FilterControl from './FilterControl';
import { FilterProps } from './types';

const MOCK_NATIVE_FILTER = {
  id: '123',
  controlValues: {
    multiSelect: true,
    enableEmptyFilter: false,
    defaultToFirstItem: false,
    inverseSelection: false,
    searchAllOptions: false,
  },
  name: 'Filter name',
  description: 'Filter description',
  filterType: 'filter_select',
  targets: [
    {
      datasetId: 1,
      column: {
        name: 'column_name',
      },
    },
  ],
  defaultDataMask: {
    extraFormData: {},
    filterState: {},
    ownState: {},
  },
  cascadeParentIds: [],
  scope: {
    rootPath: ['ROOT_ID'],
    excluded: [],
  },
  type: NativeFilterType.NATIVE_FILTER,
};

export default {
  title: 'Dashboard / Native Filters / FilterControl',
  component: FilterControl,
  parameters: { knobs: { disable: true } },
  args: {
    onFilterSelectionChange: () => null,
    filter: MOCK_NATIVE_FILTER,
  },
};

const store = getMockStoreWithNativeFilters();
export const VerticalFilterControl = (props: FilterProps) => (
  <Provider store={store}>
    <div
      css={css`
        background-color: #eee;
        padding: 50px;
      `}
    >
      <div
        css={css`
          width: 259px;
          padding: 16px 16px 0 16px;
          background-color: white;
          display: flex;
          flex-direction: column;
        `}
      >
        <FilterControl {...props} />
      </div>
    </div>
  </Provider>
);

export const HorizontalFilterControl = (props: FilterProps) => (
  <Provider store={store}>
    <div
      css={css`
        background-color: #eee;
        padding: 50px;
      `}
    >
      <div
        css={css`
          height: 48px;
          padding: 0 0 0 16px;
          background-color: white;
          display: flex;
          align-items: center;
        `}
      >
        <FilterControl horizontal {...props} />
      </div>
    </div>
  </Provider>
);

export const HorizontalOverflowFilterControl = (props: FilterProps) => (
  <Provider store={store}>
    <div
      css={css`
        background-color: #eee;
        padding: 50px;
      `}
    >
      <div
        css={css`
          width: 224px;
          padding: 16px 16px 0 16px;
          background-color: white;
          display: flex;
          flex-direction: column;
        `}
      >
        <FilterControl horizontal overflow {...props} />
      </div>
    </div>
  </Provider>
);
