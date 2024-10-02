import Image from "next/image"
import footerLogo from '@/public/svg/footer-logo.svg'

export default function Footer() {
    return (
        <div className="w-full bg-[#032541] flex items-center py-10">
            <div
                className="mx-auto w-full max-w-screen-lg grid grid-cols-5"
            >
                <Image
                    src={footerLogo}
                    alt="footerLogo"
                    className="h-[94px] w-auto"
                />

                <FooterLinks
                    title="The Basics"
                    links={[
                        'About TMDB',
                        'Contact Us',
                        'Support Forums',
                        'API',
                        'System Status',
                    ]}
                />

                <FooterLinks
                    title="Get Involved"
                    links={[
                        'Contribution Bible',
                        'Add New Movie',
                        'Add New TV Show',
                    ]}
                />
                <FooterLinks
                    title="Community"
                    links={[
                        'Guidelines',
                        'Discussions',
                        'Leaderboard',
                    ]}
                />
                <FooterLinks
                    title="Legal"
                    links={[
                        'Terms of Use',
                        'API Terms of Use',
                        'Privacy Policy',
                        'DMCA Policy',
                    ]}
                />
            </div>
        </div>
    )
}

const FooterLinks = (props: { title: string, links: string[] }) => {
    return (
        <div className="flex flex-col items-start justify-start text-white">
            <h1 className="font-bold text-lg mb-1 uppercase">{props.title}</h1>

            {
                props.links.map(link => (
                    <a className="cursor-pointer">{link}</a>
                ))
            }
        </div>
    )
}