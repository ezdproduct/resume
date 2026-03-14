import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "./SectionTitle";
import SectionWrapper from "../../shared/SectionWrapper";
import { Project, GlobalSettings } from "@/types/resume";
import { normalizeRichTextContent } from "@/lib/richText";
import { formatDateString, cn, hardenVietnamese } from "@/lib/utils";
import { useLocale } from "@/i18n/compat/client";

interface ProjectSectionProps {
    projects: Project[];
    globalSettings?: GlobalSettings;
    showTitle?: boolean;
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ projects, globalSettings, showTitle = true }) => {
    const locale = useLocale();
    const visibleProjects = projects?.filter((p) => p.visible);
    const centerSubtitle = globalSettings?.centerSubtitle;
    const flexLayout = globalSettings?.flexibleHeaderLayout;

    return (
        <SectionWrapper sectionId="projects" style={{ marginTop: `${globalSettings?.sectionSpacing || 24}px` }}>
            <SectionTitle type="projects" globalSettings={globalSettings} showTitle={showTitle} />
            <motion.div layout="position">
                <AnimatePresence mode="popLayout">
                    {visibleProjects.map((project) => (
                        <motion.div key={project.id} style={{ marginTop: `${globalSettings?.paragraphSpacing}px` }}>
                            <motion.div className="flex items-start justify-between gap-4">
                                <div className={cn("flex flex-col flex-1 min-w-0")}>
                                    <h3 className="font-bold whitespace-pre-wrap text-pretty" style={{ fontSize: `${globalSettings?.subheaderSize || 16}px` }}>{hardenVietnamese(project.name)}</h3>
                                    {project.link && !centerSubtitle && (
                                        <a href={project.link.startsWith("http") ? project.link : `https://${project.link}`} target="_blank" rel="noopener noreferrer"
                                            className="underline text-xs opacity-70 break-all" title={project.link}>
                                            {(() => { try { return new URL(project.link.startsWith("http") ? project.link : `https://${project.link}`).hostname.replace(/^www\./, ""); } catch { return project.link; } })()}
                                        </a>
                                    )}
                                </div>
                                {centerSubtitle && (
                                    <motion.div layout="position" className={cn("text-subtitleFont whitespace-pre-wrap text-pretty flex-1 text-center")} style={{ fontSize: `${globalSettings?.subheaderSize || 16}px` }}>
                                        {hardenVietnamese(project.role)}
                                    </motion.div>
                                )}
                                <div className={cn("text-subtitleFont shrink-0 whitespace-nowrap", flexLayout ? "ml-auto" : "text-right")} style={{ fontSize: `${globalSettings?.subheaderSize || 16}px` }}>
                                    {formatDateString(project.date, locale)}
                                </div>
                            </motion.div>
                            {project.role && !centerSubtitle && (
                                <motion.div layout="position" className="text-subtitleFont whitespace-pre-wrap text-pretty mt-0.5" style={{ fontSize: `${globalSettings?.subheaderSize || 16}px` }}>{hardenVietnamese(project.role)}</motion.div>
                            )}
                            {project.link && centerSubtitle && (
                                <a href={project.link.startsWith("http") ? project.link : `https://${project.link}`} target="_blank" rel="noopener noreferrer" className="underline" title={project.link}>{project.link}</a>
                            )}
                            {project.description && (
                                <motion.div layout="position" className="mt-1 text-baseFont"
                                    style={{ fontSize: `${globalSettings?.baseFontSize || 14}px`, lineHeight: globalSettings?.lineHeight || 1.6 }}
                                    dangerouslySetInnerHTML={{ __html: normalizeRichTextContent(project.description) }}
                                />
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </SectionWrapper>
    );
};

export default ProjectSection;
