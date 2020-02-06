import { useSelector, useDispatch } from 'react-redux';

export const PagesAction = () => {
    const pageNum = useSelector(state => state.page.payload);
    const dispatch = useDispatch();

    const home = () =>
        dispatch({
            type: 'HOME',
            payload: 1
        });
    const order = () =>
        dispatch({
            type: 'ORDER',
            payload: 2
        });
    const graph = () =>
        dispatch({
            type: 'GRAPH',
            payload: 3
        });
    const profile = () =>
        dispatch({
            type: 'PROFILE',
            payload: 4
        });
    const setting1 = () =>
        dispatch({
            type: 'SETTING1',
            payload: 5
        });
    const setting2 = () =>
        dispatch({
            type: 'SETTING2',
            payload: "HelloSetting"
        });
    return { pageNum, home, order, graph, profile, setting1, setting2 };
}