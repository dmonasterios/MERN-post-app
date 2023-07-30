import { useContext } from "react"
import {PostContext} from '../context/PostContext';


const usePosts = () => {
    const context = useContext(PostContext);
    return context;
}

export default usePosts