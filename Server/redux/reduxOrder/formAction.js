import { useSelector, useDispatch } from 'react-redux';

export const FormAction = () => {
    const pageNum = useSelector(state => state.page.payload);
    const dispatch = useDispatch();

}