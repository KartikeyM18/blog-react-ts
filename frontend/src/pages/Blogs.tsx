import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";

export function Blogs() {
    const { blogs, loading } = useBlogs();

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

    return <div>

        <Appbar />
        <div className="flex justify-center">
            <div className="flex w-screen items-center flex-col ">
                {blogs.map(blog => <BlogCard key={blog.id}
                    id={blog.id}
                    authorName={blog.author.name}
                    title={blog.title}
                    content={blog.content}
                    publishedDate={"13 Sept 2024"}
                />)}
            </div>
        </div>
    </div>
}