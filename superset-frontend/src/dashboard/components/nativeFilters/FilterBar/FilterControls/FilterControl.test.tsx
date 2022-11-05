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
import userEvent from '@testing-library/user-event';
import fetchMock from 'fetch-mock';
import { Filter } from '@superset-ui/core';
import { getMockStoreWithNativeFilters } from 'spec/fixtures/mockStore';
import {
  buildNativeFilter,
  rangeFilterQueryResponse,
  selectFilterQueryResponse,
} from 'spec/fixtures/mockNativeFilters';
import { render, screen } from 'spec/helpers/testing-library';
import FilterControl from './FilterControl';
import { FilterProps } from './types';

const FILTER_ID = '123';
const COLUMN_NAME = 'column_name';
const FILTER_NAME = 'Filter name';
const FILTER_DESCRIPTION = "This is the filter's description.";
const FILTER_TYPE_SELECT = 'filter_select';
const FILTER_TYPE_RANGE = 'filter_range';
const FILTER_TYPE_TIME = 'filter_time';

const getMockFilter = (filter?: Partial<Filter>) =>
  buildNativeFilter(FILTER_ID, COLUMN_NAME, [], {
    name: FILTER_NAME,
    filterType: FILTER_TYPE_SELECT,
    ...filter,
  });

const renderFilterControl = (props?: Partial<FilterProps>) => {
  const mergedProps: FilterProps = {
    onFilterSelectionChange: () => null,
    filter: getMockFilter(),
    ...props,
  };

  render(<FilterControl {...mergedProps} />, {
    useRedux: true,
    store: getMockStoreWithNativeFilters(),
  });
};

test('vertical filter title', () => {
  fetchMock.post('glob:*/api/v1/chart/data', {
    result: selectFilterQueryResponse,
  });

  renderFilterControl();
  const title = screen.getByRole('heading', { name: FILTER_NAME });
  expect(title).toBeVisible();
  expect(title).toHaveTextContent(FILTER_NAME);
  const descriptionTooltipTrigger = screen.queryByTestId(
    'description-tooltip-trigger',
  );

  expect(descriptionTooltipTrigger).not.toBeInTheDocument();
});

test('vertical filter description', async () => {
  fetchMock.post('glob:*/api/v1/chart/data', {
    result: selectFilterQueryResponse,
  });

  renderFilterControl({
    filter: getMockFilter({ description: FILTER_DESCRIPTION }),
  });

  const descriptionTooltipTrigger = screen.getByTestId(
    'description-tooltip-trigger',
  );

  expect(descriptionTooltipTrigger).toBeVisible();
  userEvent.hover(descriptionTooltipTrigger);
  const descriptionTooltip = await screen.findByRole('tooltip', {
    name: FILTER_DESCRIPTION,
  });

  expect(descriptionTooltip).toBeInTheDocument();
  expect(descriptionTooltip).toHaveTextContent(FILTER_DESCRIPTION);
});

test('vertical filter card', async () => {
  fetchMock.post('glob:*/api/v1/chart/data', {
    result: selectFilterQueryResponse,
  });

  renderFilterControl();
  const filter = screen.getByRole('heading', { name: FILTER_NAME });
  userEvent.hover(filter);
  const filterCard = await screen.findByTestId('filter-card-content');
  expect(filterCard).toBeInTheDocument();
  expect(filterCard).toHaveTextContent(FILTER_NAME);
});

test('vertical filter value, select', async () => {
  fetchMock.post('glob:*/api/v1/chart/data', {
    result: selectFilterQueryResponse,
  });

  renderFilterControl();
  const filterInput = await screen.findByRole('combobox');
  expect(filterInput).toBeVisible();
});

test('vertical filter value, range', async () => {
  fetchMock.post('glob:*/api/v1/chart/data', {
    result: rangeFilterQueryResponse,
  });

  renderFilterControl({
    filter: getMockFilter({ filterType: FILTER_TYPE_RANGE }),
  });

  const filterInput = await screen.findAllByRole('slider');
  expect(filterInput).toHaveLength(2);
  expect(filterInput[0]).toBeVisible();
  expect(filterInput[1]).toBeVisible();
});

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

// TODO: Remove
afterEach(() => {
  fetchMock.reset();
});
