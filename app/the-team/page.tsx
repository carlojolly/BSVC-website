import { Team } from "@/components/team";
import { Alumni } from "@/components/alumni";
import { Footer } from "@/components/footer";

export default function TheTeamPage() {
  return (
    <main className="min-h-screen w-full">
      <div className="h-20 md:h-24" />
      <Team />
      <Alumni />
      <Footer />
    </main>
  );
}
