import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import { FullBlog } from "../components/FullBlog";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { Appbar } from "../components/Appbar";

export default function Blog() {
  const {id} = useParams();
  const {loading, blog} = useBlog({id: id || ''});
  

  if (loading) return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="flex w-screen items-center flex-col ">

                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
            </div>
        </div>
    </div>

  return (
    <div>
      
      <FullBlog blog={blog}/>
    </div>
  )
}
