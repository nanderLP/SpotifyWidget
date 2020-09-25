import Cookies from "js-cookie";

export default function Test() {

    Cookies.set('foo', 'bar');



    return (
        <div>
            <p>{Cookies.get('foo')}</p>
        </div>
    )
}