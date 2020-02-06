import { useSelector, useDispatch } from 'redux';

export const actionCounter = () => {
    const count = useSelector(state => state.count);
    const dispatch = useDispatch();
    const increment = () =>
        dispatch({
            type: 'INCREMENT',
        });
    const decrement = () =>
        dispatch({
            type: 'DECREMENT',
        });
    return { count, increment, decrement };
}