import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';
import './Styles/Addblog.css';
import { RotatingSquare as Loader } from 'react-loader-spinner';

const AddBlog = () => {
    const [inputValue, setInputValue] = useState('');
    const [blogContent, setBlogContent] = useState([]);
    const [Loading, setLoading] = useState(false);


    const { state } = useContext(UserContext);
    const validateuser = async () => {
        try {
            const response = await fetch('/contact', {
                method: 'GET',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await response.json();
            if (response.status !== 200 || !data) {
                return navigate('/login',{replace:true});
            }
        } catch (error) {
            return navigate('/login',{replace:true});
        }
    }


useEffect(() => {
 validateuser();
}, [])



    const navigate = useNavigate();

        const isValidImageUrl = (url) => {
            return url.match(/\.(jpeg|jpg|gif|png)$/) !== null || url.startsWith('data:image');
        }
            

    const addHeading = () => {
      
        setBlogContent([...blogContent, { type: 'heading', value: inputValue }]);
        setInputValue('');
    };

    const addParagraph = () => {
       
        setBlogContent([...blogContent, { type: 'paragraph', value: inputValue }]);
        setInputValue('');
    };

    const addImage = () => {
        if (isValidImageUrl(inputValue)) {
            setBlogContent([...blogContent, { type: 'image', value: inputValue }]);
            setInputValue('');
        } else {
            alert('Invalid image URL. Please enter a valid URL ending with .jpeg, .jpg, .gif, or .png');
        }
    };
   
    let updatedBlogContent;
    


const CheckHeading=()=>{
    const titleEntry = blogContent.find(content => content.type === 'heading');
    const Paragraph = blogContent.find(content => content.type === 'paragraph');
    const str = Paragraph ? Paragraph.value.split(' ')[0] : "";
    const title = titleEntry ? titleEntry.value : str;
    updatedBlogContent=[...blogContent];
    if(!titleEntry){
    updatedBlogContent.push({ type: 'heading', value: title });
    }

    return updatedBlogContent

}
const saveBlogToDatabase = async (e) => {
    e.preventDefault();

    if (blogContent.length === 0) {
        window.alert("Please add something to the blog before posting.");
        return;
    }

    const datatosave = await CheckHeading();
    const titleEntry = datatosave.find(content => content.type === 'heading');
    const title = titleEntry ? titleEntry.value : "";

    const user = state.userId;

    setLoading(true);

    try {
        const response = await fetch('/addblog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content: datatosave, user })
        });
        
        const data = await response.json();

        if (response.status !== 200) {
            return navigate('/Error404', { replace: true });
        }

        if (response.status === 200) {
            return navigate('/home', { replace: true });
        }

    } catch (error) {
        console.error('Error saving blog:', error);
    } 
    setLoading(false);
    
};



  
return (
    <>
        {Loading && (
            <div className="loader-containeraddblog">
                <Loader color="pink" height={100} width={100} />
            </div>
        )}
        <div className={`blog-editor ${Loading ? 'opacity-effect' : ''}`}>
            <div className="blog-content">
                {blogContent.map((content, index) => {
                    if(content.type === 'heading') return <h1 key={index}>{content.value}</h1>;
                    if(content.type === 'paragraph') return <p key={index}>{content.value}</p>;
                    if(content.type === 'image') return <img key={index} src={content.value} alt="Blog content" />;
                    return null;
                })}
            </div>
            <form method="post">
                <div className="editor">
                    <input 
                        className='Addbloginput'
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Enter text or image URL..."
                    />
                    <div>
                        <button type='button' className='addblogbtn' onClick={addHeading}>Heading</button>
                        <button type='button' className='addblogbtn' onClick={addParagraph}>Paragraph</button>
                        <button type='button' className='addblogbtn'  onClick={() => addImage(inputValue)}>Image</button>
                        <button type='submit' className='addblogbtn' onClick={saveBlogToDatabase}>Post Blog</button>
                    </div>
                </div>
            </form>
        </div>
    </>
);

};

export default AddBlog;
