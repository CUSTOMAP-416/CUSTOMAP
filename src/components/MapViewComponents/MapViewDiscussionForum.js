import { useContext, useState } from 'react';
import AuthStoreContextProvider from '../../auth_store';

export default function MapViewDiscussionForum(){
    const { auth_store } = useContext(AuthStoreContextProvider);

    //list of discussions 
    const [discussions, setDiscussions] = useState([]);
    const [newDiscussion, setNewDiscussion] = useState('');

    const user = auth_store.user
    //function to handle get the Array Discussions. 
    const getArrayDiscussions = (map) => {
        setDiscussions(auth_store.getArrayDiscussions(map))
    }
    //function to handle the Discussion process 
    const onDiscussion = () => {
        auth_store.onDiscussion(newDiscussion)
    }

    //Handle discussion input changes.
    const handleNewDiscussionChange = (event) => {
        setNewDiscussion(event.target.value);
    }
    //Handle the discussion send button click. 
    const handleDiscussionSubmit = () => {
        onDiscussion()
    }

    return (
        <div>
            <h2>New Discussion</h2>
            <input type="text" value={newDiscussion} onChange={handleNewDiscussionChange}></input>
            <button type="button" onClick={() => handleDiscussionSubmit()}>Send</button>
        </div>
    )
}