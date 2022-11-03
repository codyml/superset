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
import { Filter, NativeFilterType } from '@superset-ui/core';
import { render, screen } from 'spec/helpers/testing-library';
import FilterControl from './FilterControl';
import { FilterProps } from './types';

const FILTER_NAME = 'Filter name';
const FILTER_DESCRIPTION = "This is the filter's description.";
const getMockFilter = (filter?: Partial<Filter>): Filter => ({
  id: '123',
  controlValues: {
    multiSelect: true,
    enableEmptyFilter: false,
    defaultToFirstItem: false,
    inverseSelection: false,
    searchAllOptions: false,
  },
  name: FILTER_NAME,
  description: FILTER_DESCRIPTION,
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
  ...filter,
});

const renderFilterControl = (props?: Partial<FilterProps>) => {
  const mergedProps: FilterProps = {
    onFilterSelectionChange: () => null,
    filter: getMockFilter(),
    ...props,
  };

  render(<FilterControl {...mergedProps} />, { useRedux: true });
};

test('vertical filter title', () => {
  renderFilterControl();
  screen.logTestingPlaygroundURL();
  expect(screen.findByRole('heading', { name: FILTER_NAME })).toBeVisible();
});

test.todo('vertical filter description');
test.todo('vertical filter card');
test.todo('vertical filter value, select');
test.todo('vertical filter value, range');
test.todo('vertical filter value, time range');
test.todo('horizontal filter title');
test.todo('horizontal filter description');
test.todo('horizontal filter card');
test.todo('horizontal filter value, select');
test.todo('horizontal filter value, range');
test.todo('horizontal filter value, time range');
test.todo('horizontal overflow filter title');
test.todo('horizontal overflow filter description');
test.todo('horizontal overflow filter card');
test.todo('horizontal overflow filter value, select');
test.todo('horizontal overflow filter value, range');
test.todo('horizontal overflow filter value, time range');
