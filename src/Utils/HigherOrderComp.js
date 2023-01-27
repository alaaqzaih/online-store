import { useLocation, useParams, useSearchParams } from "react-router-dom"

export function withRoute(MyComponent) {

    return function (props) {
        const queryString = useSearchParams();
        const location = useLocation();
        const params = useParams();

        return <MyComponent {...props}
            location={location}
            queryString={queryString}
            params={params} />
    }

}