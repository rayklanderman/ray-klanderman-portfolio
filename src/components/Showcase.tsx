import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaPlay, FaYoutube } from 'react-icons/fa';
import { LINKS, SHOWCASE, showcaseEmbedUrl } from '../data/site';
import { getProjectBySlug, projectPath } from '../data/projects';
import './Showcase.scss';

const thumb = (id: string, size: 'lg' | 'sm') => `/images/showcase/${id}${size === 'sm' ? '-sm' : ''}.jpg`;

/**
 * Demo playlist player. Thumbnails are self-hosted; the YouTube player (~1 MB of
 * third-party script) loads only after the visitor presses play or picks a video.
 */
const Showcase: FC = () => {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const videos = SHOWCASE.videos;
  const current = videos[active];

  const play = (index: number) => {
    setActive(index);
    setPlaying(true);
  };

  return (
    <div id="showcase" className="showcase">
      <h3 id="showcase-title" className="showcase__title">
        {t('showcase.title')}
      </h3>
      <p className="showcase__description">{t('showcase.description')}</p>

      <div className="showcase__player">
        <div className="showcase__stage">
          {playing ? (
            <iframe
              key={current.id}
              className="showcase__iframe"
              src={showcaseEmbedUrl(current.id)}
              title={`${current.title}: ${t('showcase.iframeTitle')}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <button type="button" className="showcase__placeholder" onClick={() => play(active)}>
              <img
                className="showcase__poster"
                src={thumb(current.id, 'lg')}
                alt=""
                width={1280}
                height={720}
                loading="lazy"
                decoding="async"
              />
              <span className="showcase__overlay">
                <span className="showcase__play" aria-hidden="true">
                  <FaPlay />
                </span>
                <span className="showcase__label">{t('showcase.play', { title: current.title })}</span>
                <span className="showcase__hint">{t('showcase.privacy')}</span>
              </span>
            </button>
          )}
        </div>

        <div className="showcase__playlist">
          <p className="showcase__playlist-head">
            <FaYoutube aria-hidden="true" />
            <span>
              <strong>{SHOWCASE.playlistTitle}</strong>
              <span className="showcase__count">{t('showcase.videoCount', { count: videos.length })}</span>
            </span>
          </p>
          <ol className="showcase__list" aria-label={t('showcase.listLabel')}>
            {videos.map((video, i) => {
              const project = getProjectBySlug(video.project);
              const isActive = i === active;
              return (
                <li key={video.id} className={`showcase__item${isActive ? ' is-active' : ''}`}>
                  <button
                    type="button"
                    className="showcase__select"
                    onClick={() => play(i)}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    <span className="showcase__thumb">
                      <img src={thumb(video.id, 'sm')} alt="" width={320} height={180} loading="lazy" decoding="async" />
                      {isActive && playing && <span className="showcase__badge">{t('showcase.nowPlaying')}</span>}
                    </span>
                    <span className="showcase__meta">
                      <span className="showcase__item-title">{video.title}</span>
                      {project && <span className="showcase__tagline">{project.tagline}</span>}
                    </span>
                  </button>
                  {project && (
                    <Link to={projectPath(project.slug)} className="showcase__case">
                      {t('showcase.caseStudy')}
                      <span className="visually-hidden">: {video.title}</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <p className="showcase__link">
        <a href={LINKS.showcasePlaylist} target="_blank" rel="noopener noreferrer" className="text-link">
          <FaYoutube aria-hidden="true" /> {t('showcase.openOnYoutube')}
          <span className="visually-hidden"> ({t('common.newTab')})</span>
        </a>
      </p>
    </div>
  );
};

export default Showcase;
