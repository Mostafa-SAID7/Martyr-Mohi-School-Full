import { CheckCircle } from "lucide-react";
import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { Footer } from "@/components/layout/Footer";
import { AppCard, AppCardHeader, AppCardTitle, AppCardDescription } from "@/components/common/AppCard";
import { ABOUT_VALUES, ACHIEVEMENTS } from "@/data";
import { useLang } from "@/contexts/LanguageContext";
import schoolImg from "@/assets/about-school.jpg";

const About = () => {
  const { lang } = useLang();
  return (
    <div className="h-dvh flex flex-col overflow-hidden">
      <PublicNavbar />
      <div className="flex flex-col flex-1 min-h-0 overflow-y-auto">
        <main className="flex-1 py-12">
          <div className="shell">
            {/* School Image */}
            <div className="relative max-w-5xl mx-auto mb-12 rounded-2xl overflow-hidden border border-border shadow-card-hover">
              <img
                src={schoolImg}
                alt={lang === "ar" ? "مدرسة الشهيد محي الدين نوح شاهين" : "Martyr Mohi El-Din Shaheen School"}
                width={1280}
                height={896}
                loading="lazy"
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>

            {/* Page Header */}
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {lang === "ar" ? "عن مدرسة الشهيد محي الدين نوح شاهين" : "About Martyr Mohi El-Din Shaheen School"}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {lang === "ar"
                  ? "مدرسة الشهيد محي الدين نوح شاهين للتعليم الأساسي تقع في ميت الرخا بمركز زفتى بمحافظة الغربية، وتقدم خدمات تعليمية للمجتمع المحلي."
                  : "Martyr Mohi El-Din Shaheen Basic Education School is located in Mit Al-Rakha, Zefta, Gharbia Governorate, providing educational services to the local community."}
              </p>
            </div>

            {/* Mission, Vision, Values */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {ABOUT_VALUES.map((item, index) => (
                <AppCard key={index} className="text-center">
                  <AppCardHeader>
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-primary/10 border border-primary/20 mb-4 mx-auto">
                      <item.icon className="h-7 w-7 text-primary" />
                    </div>
                    <AppCardTitle className="text-xl">
                      {lang === "ar" ? item.titleAr : item.titleEn}
                    </AppCardTitle>
                    <AppCardDescription className="text-base leading-relaxed">
                      {lang === "ar" ? item.descriptionAr : item.descriptionEn}
                    </AppCardDescription>
                  </AppCardHeader>
                </AppCard>
              ))}
            </div>

            {/* Achievements */}
            <div className="bg-card rounded-lg border border-border p-8 shadow-card">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                {lang === "ar" ? "إنجازاتنا" : "Our Achievements"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
                {ACHIEVEMENTS.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-card-foreground">
                      {lang === "ar" ? achievement.textAr : achievement.textEn}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default About;
