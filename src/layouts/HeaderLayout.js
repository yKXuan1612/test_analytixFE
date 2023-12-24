import Header from "../components/Header";
import Footer from "../components/Footer";

function HeaderLayout({ children }) {
    return (
        <div className="main-layout bg-black h-fit">
            <Header />
            {children}
            <Footer />
        </div>
    );
}

export default HeaderLayout;