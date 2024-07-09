const Navbar = () => {
    return (
        <header className="bb-1 bc-l-silver-6 bg-white d-f fs-sm fw-w py-4 sm:fw-nw sm:jc-fs w-full">
            <nav className="mx-auto px-4 sm:ai-c sm:d-f sm:jc-sb w-full">
                <div className="ai-c d-f jc-sb">
                    <a className="f-none fs-xl fw-600" href="/">Yumma CSS Play <span class="ai-c b-1 bc-l-pink-4 bg-l-pink-6 cg-6 d-if fs-xs fw-500 px-2 py-1 rad-1 t-pink">Alpha</span></a>
                    <div className="sm:d-none">
                        <button className="c-p ai-c b-1 bc-l-silver-6 bg-white bs-sm cg-2 d-if jc-c p-2 rad-2 t-d-silver-6">
                            <svg className="dim-4 fs-0" width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 5H21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M3 12H21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M3 19H21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="d-none fb-full fg-1 ovf-h sm:d-b">
                    <div className="d-f fd-c g-5 sm:ai-c sm:fd-r sm:jc-fe sm:pl-5">
                        <a className="fw-500 h:t-pink t-lead" href="https://www.yummacss.com/docs/installation">Docs</a>
                        <a className="fw-500 h:t-pink t-lead" href="https://www.yummacss.com/components">Components</a>
                        <a className="fw-500 h:t-pink t-lead" href="https://www.yummacss.com/blog">Blog</a>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;