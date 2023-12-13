import { useContext, useState, useEffect } from 'react';
import AuthStoreContextProvider from '../../auth_store';
import '../../styles/Discuss.css';

export default function MapViewDiscussionForum(){
    const { auth_store } = useContext(AuthStoreContextProvider);

    //list of discussions 
    const [discussions, setDiscussions] = useState([]);
    const [newDiscussion, setNewDiscussion] = useState('');

    //Handle discussion input changes.
    const handleNewDiscussionChange = (event) => {
        setNewDiscussion(event.target.value);
    }
    //Handle the discussion send button click. 
    const handleDiscussionSubmit = () => {
        let discussionShow = [...discussions]
        discussionShow.push(
            <div key={'discussions'+discussionShow.length} className="message-container">
                <div style={{display: "flex", flexWrap: "wrap", justifyContent: "flex-start", paddingBottom:"10px"}}>
                    <div className='username'>{auth_store.user.username}:</div>
                    <button className="message">{newDiscussion}</button>
                </div>
            </div>
        )
        setDiscussions(discussionShow)
        setNewDiscussion('');
        //function to handle the Discussion process 
        auth_store.onDiscussion(newDiscussion)
    }

    useEffect(() => {
        if(auth_store.selectMap){
            let discussionShow = []
            for(let i=0; i<auth_store.selectMap.discussions.length; i++){
                discussionShow.push(
                    <div key={'discussions'+i} className="message-container">
                        <div style={{display: "flex", flexDirection: "column",justifyContent: "flex-start", paddingBottom:"10px"}}>
                            <div className='username'>{auth_store.selectMap.discussions[i].username}</div>
                            <button className="message" >{auth_store.selectMap.discussions[i].content}</button>
                        </div>
                    </div>
                )
            }
            setDiscussions(discussionShow)
        }
    }, [auth_store.selectMap]);

//style={{width:"100%"}}
    

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
                    {discussions}
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