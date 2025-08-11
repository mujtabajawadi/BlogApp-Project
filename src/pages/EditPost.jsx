import React, {useState, useEffect} from 'react'
import { Container, PostForm } from "../components/index";
import obj_DB_Service from '../appwrite/configuration';
import { useNavigate, useParams } from 'react-router-dom';



const EditPost = () => {
    const [post, setPost] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        console.log(slug)
        if (slug) {
            obj_DB_Service.getPost(slug).then((post) => {
                if (post) {
                    setPost(post)
                } else {
                    navigate('/')
                }
            })
            
        }
        
    },[slug, navigate])


    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post}/>
            </Container>
    </div>
    ) : null
}

export default EditPost
