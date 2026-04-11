import CreateBlogClient from "./CreateBlogClient";
import VideoListAdmin from "@/components/VideoListAdmin";
export default function CreateBlog() {
  return(
    <div>
      
      <div>
        <CreateBlogClient />
      </div>
      
      <div className="text-center items-center mt-2" >
        <h1 className="text-center text-xl">Liste des videos blog</h1>
        <VideoListAdmin />
      </div>
      
    </div>
    
    )
}