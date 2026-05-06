import PageHeader from "@/components/PageHeader";
import SocialCard from "@/components/SocialCard";
import { socials } from "@/lib/portfolio-data";

export default function SocialsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Connect"
        title="Socials"
        description="A quick matrix of places to find my work, updates, and public profiles."
      />
      <div className="page-body">
        <div className="container-xl">
          <div className="row row-cards">
            {socials.map((social) => (
              <div className="col-md-6" key={social.platform}>
                <SocialCard social={social} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
