import React from 'react'
import {getSortFunction, sortByDate, sortByItemCount, sortOrders, sortTypes} from './sortOrders';

describe('sortOrders function', () => {
	it('empty params', () => {
		const result = sortOrders([], null);
		expect(result).toBe(undefined);
	});

	it('not function', () => {
		const result = sortOrders([1, 2], null);
		expect(result).toBe(undefined);
	});

	it('function called', () => {
		const mockSortByDate = jest.fn()
		sortOrders([1, 2], mockSortByDate);
		expect(mockSortByDate).toHaveBeenCalled();
	});
});

describe('getSortFunction function', () => {
	it('sortByDate called', () => {
		const result = getSortFunction(sortTypes.DATE);
		expect(result).toBe(sortByDate);
	});

	it('sortByItemCount called', () => {
		const result = getSortFunction(sortTypes.COUNT);
		expect(result).toBe(sortByItemCount);
	});
});

describe('sortByItemCount function', () => {
	const cases = [
		[{items: ['1', '2', '3']}, {items:['1', '2']}, 1],
		[{items: ['1', '2']}, {items:['1', '2', '3']}, -1],
		[{item: ['1', '2']}, {item:['1', '2']}, 0],
		[{item: []}, {item:[]}, 0],
		[{undefined}, {undefined}, 0],
		[undefined, undefined, 0],
		[null, null, 0],
	];

	test.each(cases)('(%p, %p, %i)', (order1, order2, expected) => {
		expect(sortByItemCount(order1, order2)).toBe(expected);

	});
})

describe('sortByDate function', () => {
	const cases = [
		[{date: [1]}, {date:[12]}, 1],
		[{date: [12]}, {date:[1]}, -1],
		[{date: []}, {date:[]}, 0],
		[{undefined}, {undefined}, 0],
		[undefined, undefined, 0],
		[null, null, 0],
	];

	test.each(cases)('(%i, %i, %i)', (order1, order2, expected) => {
		expect(sortByDate(order1, order2)).toBe(expected);

	});
})
