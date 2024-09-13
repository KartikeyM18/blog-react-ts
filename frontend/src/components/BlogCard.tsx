import { Link } from "react-router-dom"

interface BlogCardProps {
    authorName: string,
    title: string,
    content: string,
    publishedDate: string,
    id: string,
}

export function BlogCard({
    authorName,
    title,
    content,
    publishedDate,
    id
}: BlogCardProps) {
    return <Link to={`/blog/${id}`}>

        <div className="border-b-4 p-4 border-slate-200 pb-4 max-w-screen-md w-screen cursor-pointer">

            <div className="flex items-center">
                <Avatar authorName={authorName} size="small" />
                <div className=" pl-2">{authorName}</div>
                <div className="text-xs pl-2">&#9679;</div>
                <div className=" pl-2 text-slate-600">{publishedDate}</div>

            </div>

            <div className="text-2xl font-bold">
                {title}
            </div>

            <div className="text-base ">
                {content.substring(0, 100) + "..."}
            </div>

            <div className="text-slate-500">
                {`${Math.ceil(content.length / 100)} minute(s) read`}
            </div>
        </div>
    </Link>
}

export function Avatar({ authorName, size }: { authorName: string, size: "small" | "big" }) {
    return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${size === "small" ? "h-6 w-6" : "h-10 w-10"}`}>
        <span className={`${size === "small" ? "font-medium text-sm" : "font-bold text-2xl"} text-gray-300 `}>{`${authorName[0]}`}</span>
    </div>
}