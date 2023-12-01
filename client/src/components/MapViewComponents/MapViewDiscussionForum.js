import { useContext, useState } from 'react';
import AuthStoreContextProvider from '../../auth_store';
import '../../styles/Discuss.css';

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

  ////////////// side bar show control////////////////
        const [isOpen, setIsOpen] = useState(false);
      
        const toggleSidebar = () => {
          setIsOpen(!isOpen);
        };
///////////////////////////////////////////////////
    return (
        <div>
            <div className={`sidebar-container ${isOpen ? 'open' : ''}`}>
                <button className="toggle-button" onClick={toggleSidebar}>
                    {isOpen ? '<' : '>'}
                </button>
                <div className="sidebar-content">
                    <div className="message-container">
                        <div className="username">Jack</div>
                        <div className="message">Hey, your map has an error!</div>
                    </div>
                
                    <div className="sidebar-footer">
                        <input
                            type="text"
                            value={newDiscussion}
                            onChange={handleNewDiscussionChange}
                            placeholder="Type a message..." />
                        <button type="button" onClick={() => handleDiscussionSubmit()}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}