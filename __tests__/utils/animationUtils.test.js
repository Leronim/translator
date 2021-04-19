import { isBetweenPills, checkOrder, removePills } from '../../utils/animationUtils';

test('between pills', () => {
    expect(isBetweenPills(100, 90, 110)).toBeTruthy();
    expect(isBetweenPills(100, 0, 1000)).toBeTruthy();
    expect(isBetweenPills(80, 90, 110)).not.toBeTruthy();
    expect(isBetweenPills(120, 90, 110)).not.toBeTruthy();
    expect(isBetweenPills(0, 0, 0)).toBeTruthy();
    expect(isBetweenPills(10, 20, 0)).not.toBeTruthy();
});

test('check order', () => {
    expect(checkOrder({order: {value: 0}})).toBeTruthy();
    expect(checkOrder({order: {value: -1}})).not.toBeTruthy();
    expect(checkOrder({order: {value: 100}})).toBeTruthy();
    expect(checkOrder({order: {value: -100}})).toBeTruthy();
});

test('remove pills', () => {
    
})