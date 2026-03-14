import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Experience, GlobalSettings } from "@/types/resume";
import SectionTitle from "./SectionTitle";
import SectionWrapper from "../../shared/SectionWrapper";
import { normalizeRichTextContent } from "@/lib/richText";
import { formatDateString, cn, hardenVietnamese } from "@/lib/utils";
import { useLocale } from "@/i18n/compat/client";

interface ExperienceSectionProps {
    experiences?: Experience[];
    globalSettings?: GlobalSettings;
    showTitle?: boolean;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences, globalSettings, showTitle = true }) => {
    const locale = useLocale();
    const visibleExperiences = experiences?.filter((exp) => exp.visible);
    const centerSubtitle = globalSettings?.centerSubtitle;
    const flexLayout = globalSettings?.flexibleHeaderLayout;

    return (
        <SectionWrapper sectionId="experience" style={{ marginTop: `${globalSettings?.sectionSpacing || 24}px` }}>
            <SectionTitle type="experience" globalSettings={globalSettings} showTitle={showTitle} />
            <AnimatePresence mode="popLayout">
                {visibleExperiences?.map((exp) => (
                    <motion.div key={exp.id} layout="position" style={{ marginTop: `${globalSettings?.paragraphSpacing}px` }}>
                        <motion.div className="flex items-start justify-between gap-4">
                            <div className={cn("font-bold whitespace-pre-wrap break-words text-pretty", flexLayout ? "shrink-0" : "flex-1")} style={{ fontSize: `${globalSettings?.subheaderSize || 16}px` }}>
                                {hardenVietnamese(exp.company)}
                            </div>
                            {centerSubtitle && (
                                <motion.div className={cn("text-subtitleFont whitespace-pre-wrap text-pretty flex-1 text-center")} style={{ fontSize: `${globalSettings?.subheaderSize || 16}px` }}>
                                    {hardenVietnamese(exp.position)}
                                </motion.div>
                            )}
                            <div className={cn("text-subtitleFont shrink-0 whitespace-nowrap", flexLayout ? "ml-auto" : "text-right")} style={{ fontSize: `${globalSettings?.subheaderSize || 16}px` }}>
                                {formatDateString(exp.date, locale)}
                            </div>
                        </motion.div>
                        {exp.position && !centerSubtitle && (
                            <motion.div className="text-subtitleFont whitespace-pre-wrap text-pretty" style={{ fontSize: `${globalSettings?.subheaderSize || 16}px` }}>{hardenVietnamese(exp.position)}</motion.div>
                        )}
                        {exp.details && (
                            <motion.div className="mt-1 text-baseFont" dangerouslySetInnerHTML={{ __html: normalizeRichTextContent(exp.details) }}
                                style={{ fontSize: `${globalSettings?.baseFontSize || 14}px`, lineHeight: globalSettings?.lineHeight || 1.6 }}
                            />
                        )}
                    </motion.div>
                ))}
            </AnimatePresence>
        </SectionWrapper>
    );
};

export default ExperienceSection;
