import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Breadcrumbs,
  Link,
  Chip,
  Stack,
  LinearProgress,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const fadeUp = (d = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut', delay: d } },
});

const WPM = 200;

const BlogPost = () => {
  const { filename } = useParams();
  const [rawHtml, setRawHtml] = useState('');
  const [title, setTitle] = useState(filename.replace(/\.html?$/i, ''));
  const [excerpt, setExcerpt] = useState('A post on Amaze Puzzles.');
  const [readingMinutes, setReadingMinutes] = useState(null);
  const [toc, setToc] = useState([]);
  const [progress, setProgress] = useState(0);

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const contentRef = useRef(null);

  // Fetch & parse HTML
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(`/Posts/${filename}`);
        if (!res.ok) throw new Error('Failed to fetch post');
        const html = await res.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const root = doc.querySelector('article') || doc.body;

        // Extract title from first <h1>, remove it
        const h1 = root.querySelector('h1');
        const derivedTitle = h1?.textContent?.trim() || filename.replace(/\.html?$/i, '');
        if (h1) h1.remove();

        // Remove first <hr> (commonly right after h1 in your posts)
        const firstHr = root.querySelector('hr');
        if (firstHr) firstHr.remove();

        // TOC from h2/h3
        const headings = [];
        let idx = 0;
        root.querySelectorAll('h2, h3').forEach((el) => {
          if (!el.id) {
            const slug =
              (el.textContent || `section-${idx++}`)
                .toLowerCase()
                .replace(/[^\w]+/g, '-')
                .replace(/(^-|-$)/g, '');
            el.id = slug || `section-${idx++}`;
          }
          headings.push({ id: el.id, text: el.textContent || '', level: el.tagName.toLowerCase() });
        });

        // Excerpt + read time
        const firstP = root.querySelector('p');
        const derivedExcerpt =
          firstP?.textContent?.trim()?.slice(0, 200) ||
          'Read this article on Amaze Puzzles.';
        const wordCount = (root.textContent || '').split(/\s+/).filter(Boolean).length;
        const minutes = Math.max(1, Math.round(wordCount / WPM));

        if (!mounted) return;
        setTitle(derivedTitle);
        setExcerpt(derivedExcerpt);
        setToc(headings);
        setReadingMinutes(minutes);
        setRawHtml(root.innerHTML);
      } catch (e) {
        console.error('Error fetching the blog post:', e);
        if (mounted) {
          setRawHtml('<p>Sorry, this post could not be loaded right now.</p>');
          setExcerpt('This post could not be loaded right now.');
        }
      }
    })();
    return () => { mounted = false; };
  }, [filename]);

  // Reading progress (main article area)
  useEffect(() => {
    const onScroll = () => {
      const el = contentRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight || document.documentElement.clientHeight;
      const total = el.scrollHeight - windowH;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const pct = total > 0 ? (scrolled / total) * 100 : 0;
      setProgress(pct);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [rawHtml]);

  const pageTitle = useMemo(() => `${title} | Amaze Puzzles`, [title]);

  return (
    <Container sx={{ p: 0, maxWidth: '100% !important' }}>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={excerpt} />
      </Helmet>

      {/* Breadcrumb bar (directly under navbar) */}
      <Box
        component={motion.div}
        {...fadeUp(0)}
        sx={{
          borderBottom: '1px solid #e2e8f0',
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(8px)',
          position: 'relative',
        }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 3, sm: 5, md: 6 }, py: 1.25 }}>
          <Breadcrumbs
            sx={{
              color: '#ffffff',
              '& a': { color: '#ffffff' },
            }}
          >
            <Link component={RouterLink} to="/blog" underline="hover">
              Blog
            </Link>
            <Typography color="#ffffff">{title}</Typography>
          </Breadcrumbs>
        </Container>
      </Box>

      {/* Title header (no breadcrumbs here anymore) */}
      <Box
        component={motion.header}
        {...fadeUp(0.05)}
        sx={{
          position: 'relative',
          color: 'white',
          textAlign: 'center',
          overflow: 'hidden',
          pt: { xs: 6, md: 9 },
          pb: { xs: 6, md: 9 },
          background: 'linear-gradient(135deg, rgba(147,51,234,0.95), rgba(37,99,235,0.95))',
        }}
      >
        {/* soft blobs */}
        <Box sx={{
          position: 'absolute', top: '12%', right: -80, width: 320, height: 320,
          bgcolor: 'rgba(255,255,255,0.12)', borderRadius: '50%', filter: 'blur(60px)',
        }}/>
        <Box sx={{
          position: 'absolute', bottom: '12%', left: -90, width: 280, height: 280,
          bgcolor: 'rgba(255,255,255,0.1)', borderRadius: '50%', filter: 'blur(60px)',
        }}/>

        <Container maxWidth="lg" sx={{ position: 'relative', px: { xs: 3, sm: 5, md: 6 } }}>
          <Typography variant="h2" sx={{ fontWeight: 800, lineHeight: 1.1 }}>
            {title}
          </Typography>
          <Stack direction="row" spacing={1.5} justifyContent="center" sx={{ mt: 2 }}>
            {readingMinutes != null && (
              <Chip
                label={`${readingMinutes} min read`}
                sx={{ bgcolor: 'rgba(255,255,255,.15)', color: 'white', fontWeight: 700 }}
              />
            )}
          </Stack>
        </Container>
      </Box>

      {/* Article layout with more padding */}
      <Container
        maxWidth="lg"
        sx={{
          px: { xs: 3, sm: 5, md: 6 }, // more side padding so it doesn’t hug edges
          py: { xs: 6, md: 10 },
        }}
      >
        <Box sx={{ display: 'grid', gridTemplateColumns: { md: '1fr 300px' }, gap: { xs: 0, md: 6 } }}>
          {/* Main content */}
          <Box ref={contentRef}>
            <Box
              className="prose"
              sx={{
                color: '#0f172a',
                padding: '10px',
                '& h2': { fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 800, mt: 4, mb: 1, scrollMarginTop: '100px' },
                '& h3': { fontSize: { xs: '1.25rem', md: '1.5rem' }, fontWeight: 800, mt: 3, mb: 1, scrollMarginTop: '100px' },
                '& p': { color: '#475569', lineHeight: 1.8, fontSize: '1.05rem', mb: 2 },
                '& li': { color: '#475569', lineHeight: 1.8 },
                '& hr': { border: 0, borderTop: '1px solid #e2e8f0', my: 3 },
                '& img': { maxWidth: '100%', borderRadius: 2, display: 'block', my: 2 },
                '& a': { color: '#2563eb', textDecorationColor: '#93c5fd' },
                '& blockquote': {
                  borderLeft: '4px solid #93c5fd',
                  background: '#f8fafc',
                  p: 2,
                  borderRadius: 2,
                  color: '#334155',
                },
              }}
              dangerouslySetInnerHTML={{ __html: rawHtml }}
            />
          </Box>

          {/* TOC - improved contrast + padding */}
          {isDesktop && toc.length > 0 && (
            <Box
              sx={{
                position: 'sticky',
                top: 112, // below navbar + progress
                alignSelf: 'start',
                border: '1px solid #e2e8f0',
                borderRadius: 3,
                p: 2.25,
                background: '#ffffff',              // solid white for contrast
                color: '#0f172a',
                boxShadow: '0 10px 15px -10px rgba(0,0,0,0.12)',
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0f172a', mb: 1.25 }}>
                On this page
              </Typography>
              <nav>
                <ul style={{ listStyle: 'none', padding: '5px', margin: 0 }}>
                  {toc.map((i) => (
                    <li key={i.id} style={{ margin: i.level === 'h3' ? '6px 0 6px 12px' : '8px 0' }}>
                      <Link
                        href={`#${i.id}`}
                        underline="hover"
                        sx={{
                          fontSize: '.95rem',
                          color: '#ffffffff',         // darker link color
                          '&:hover': { color: '#fff' },
                        }}
                      >
                        {i.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </Box>
          )}
        </Box>
      </Container>
    </Container>
  );
};

export default BlogPost;
