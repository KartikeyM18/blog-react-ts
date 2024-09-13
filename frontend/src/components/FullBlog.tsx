import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

export function FullBlog({ blog }: { blog?: Blog}) {

    return <div>
        <Appbar />
        <div className="flex justify-center">

            <div className="grid lg:grid-cols-12 w-full px-10 pt-12 max-w-screen-xl">
                <div className="col-span-8 w-full">
                    <div className="text-3xl font-extrabold">
                        {blog?.title}
                    </div>
                    <div className="text-slate-500 pt-2">
                        Posted on 31 Feb 2024
                    </div>
                    <div className="pt-4">
                        {blog?.content}
                    </div>
                </div>
                <div className="col-span-8 lg:col-span-4 lg:pt-0 pt-4">
                    
                    <div className="text-slate-500 text-lg">Author</div>
                    <div className="flex">
                        <div className="flex flex-col justify-center pr-2">

                        <Avatar authorName={blog?.author.name || "Anonymous"} size="big" />
                        </div>
                        <div>
                        <div className="text-xl font-bold">
                            {blog?.author.name}
                        </div>

                        <div className="pt-2 text-slate-500">
                            Random shit about author. Too lazy to add this feature
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}