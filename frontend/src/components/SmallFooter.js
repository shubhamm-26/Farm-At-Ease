import Link from 'next/link';


const SmallFooter = () => {
    return (
        <div className="bg-primary text-white flex justify-between px-8 py-1">
            <div className="links">
                <Link href="/fruits">Fruits Disease Predictor</Link> | <Link href="/vegetables">Vegetables Disease Predictor</Link>
            </div>
            <div className="copyright">
                &copy; {new Date().getFullYear()} Farm At Ease
            </div>
        </div>
    );
};

export default SmallFooter;