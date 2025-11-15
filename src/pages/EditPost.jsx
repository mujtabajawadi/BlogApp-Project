import React, {useState, useEffect} from 'react'
import { Container, PostForm } from "../components/index";
import obj_DB_Service from '../appwrite/configuration';
import { useNavigate, useParams } from 'react-router-dom';



const EditPost = () => {
    const [post, setPost] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const { slug } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        setIsLoading(true)
        if (slug) {
            obj_DB_Service.getPost(slug).then((post) => {
                if (post) {
                    setPost(post)
                } else {
                    navigate('/')
                }
            }).catch(error => {
                console.log("Error fetching post: ", error)
            }).finally(() => {
                setIsLoading(false)
            })
            
        }
        
    },[slug, navigate])

   if (isLoading) {
      return (
        <div className="w-full py-8 mt-4 text-center">
          <Container>
            <div className="flex flex-wrap">
              <div className="p-2 w-full">
                <h1 className="text-2xl font-bold">Loading Posts...</h1>
              </div>
            </div>
          </Container>
        </div>
      );
  }

    return (!isLoading && post) ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post}/>
            </Container>
    </div>
    ) : null
}

export default EditPost
