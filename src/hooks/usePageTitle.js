import { useEffect } from "react";

const DEFAULT_TITLE = " карпатські фітопрепарати";

export default function usePageTitle(title) {
    useEffect(() => {
        if (title) {
            document.title = `${title} | Карпатські фітопрепарати`;
        } else {
            document.title = DEFAULT_TITLE;
        }
    }, [title]);
}
