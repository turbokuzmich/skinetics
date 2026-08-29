"use client";

import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { BrandId, MarketplaceId } from "@/types";
import MarketplaceActionButton from "./marketplaceActionButton";

type HeroMarketplace = Readonly<{
  id: MarketplaceId;
  label: string;
  link: string;
  logoSrc: string;
}>;

export type HomeHeroSlide = Readonly<{
  id: string;
  brandId: BrandId;
  brandName: string;
  brandColor: string;
  href: string;
  image: string;
  imageAlt: string;
  marketplaces: readonly HeroMarketplace[];
  title: string;
}>;

type Props = Readonly<{
  slides: readonly HomeHeroSlide[];
}>;

type SlideDirection = "next" | "previous";

export default function HomeHeroCarousel({ slides }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [slideDirection, setSlideDirection] =
    useState<SlideDirection>("next");
  const [outgoingSlide, setOutgoingSlide] = useState<HomeHeroSlide | null>(
    null,
  );
  const outgoingSlideTimeout = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const activeSlide = slides[activeIndex];

  useEffect(() => {
    return () => {
      if (outgoingSlideTimeout.current) {
        clearTimeout(outgoingSlideTimeout.current);
      }
    };
  }, []);

  const changeSlide = useCallback(
    (nextIndex: number, direction: SlideDirection) => {
      if (nextIndex === activeIndex) {
        return;
      }

      if (outgoingSlideTimeout.current) {
        clearTimeout(outgoingSlideTimeout.current);
      }

      setOutgoingSlide(slides[activeIndex]);
      setHasInteracted(true);
      setSlideDirection(direction);
      setActiveIndex(nextIndex);
      outgoingSlideTimeout.current = setTimeout(() => {
        setOutgoingSlide(null);
        outgoingSlideTimeout.current = null;
      }, 720);
    },
    [activeIndex, slides],
  );

  const showPrevious = useCallback(() => {
    changeSlide(
      activeIndex === 0 ? slides.length - 1 : activeIndex - 1,
      "previous",
    );
  }, [activeIndex, changeSlide, slides.length]);

  const showNext = useCallback(() => {
    changeSlide((activeIndex + 1) % slides.length, "next");
  }, [activeIndex, changeSlide, slides.length]);

  return (
    <Box
      component="figure"
      aria-label="Средства трёх брендов каталога Skinetics"
      aria-roledescription="карусель"
      sx={{ m: 0 }}
    >
      <Box
        sx={{
          aspectRatio: { xs: "4 / 5", sm: "1 / 1" },
          backgroundColor: "#E9E0D2",
          borderRadius: { xs: "20px", sm: "28px" },
          boxShadow: "0 28px 70px rgba(73, 56, 42, 0.16)",
          overflow: "hidden",
          position: "relative",
          transition: "box-shadow 240ms ease, transform 240ms ease",
          "&:hover": {
            boxShadow: "0 34px 82px rgba(73, 56, 42, 0.2)",
            transform: "translateY(-4px)",
          },
          "@media (prefers-reduced-motion: reduce)": {
            transition: "none",
          },
        }}
      >
        <Box
          key={activeSlide.id}
          component={Link}
          href={activeSlide.href}
          aria-label={`Подробнее о товаре: ${activeSlide.title}`}
          sx={{
            animation: hasInteracted
              ? `${slideDirection === "next" ? "heroProductInNext" : "heroProductInPrevious"} 980ms cubic-bezier(0.42, 0, 0.58, 1)`
              : "none",
            zIndex: 0,
            display: "block",
            inset: 0,
            position: "absolute",
            "@keyframes heroProductInNext": {
              from: { opacity: 0, transform: "scale(1.015) translateX(10px)" },
              to: { opacity: 1, transform: "scale(1) translateX(0)" },
            },
            "@keyframes heroProductInPrevious": {
              from: { opacity: 0, transform: "scale(1.015) translateX(-10px)" },
              to: { opacity: 1, transform: "scale(1) translateX(0)" },
            },
            "@media (prefers-reduced-motion: reduce)": {
              animation: "none",
            },
          }}
        >
          <Image
            alt={activeSlide.imageAlt}
            fill
            priority={activeIndex === 0}
            sizes="(max-width: 899px) 100vw, 46vw"
            src={activeSlide.image}
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </Box>
        <Box
          aria-hidden="true"
          sx={{
            background:
              "linear-gradient(180deg, rgba(252, 250, 245, 0) 24%, rgba(252, 250, 245, 0.16) 48%, rgba(252, 250, 245, 0.78) 82%, rgba(252, 250, 245, 1) 100%)",
            inset: 0,
            pointerEvents: "none",
            position: "absolute",
            zIndex: 1,
          }}
        />
        {outgoingSlide ? (
          <Box
            key={outgoingSlide.id}
            aria-hidden="true"
            sx={{
              animation:
                "heroSlideOut 700ms cubic-bezier(0.42, 0, 0.58, 1) forwards",
              inset: 0,
              pointerEvents: "none",
              position: "absolute",
              zIndex: 2,
              "@keyframes heroSlideOut": {
                from: { opacity: 1, transform: "scale(1)" },
                to: { opacity: 0, transform: "scale(1.01)" },
              },
              "@media (prefers-reduced-motion: reduce)": {
                animation: "none",
                opacity: 0,
              },
            }}
          >
            <Image
              alt=""
              fill
              sizes="(max-width: 899px) 100vw, 46vw"
              src={outgoingSlide.image}
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
            <Box
              sx={{
                background:
                  "linear-gradient(180deg, rgba(255, 255, 255, 0) 24%, rgba(255, 255, 255, 0.16) 48%, rgba(255, 255, 255, 0.78) 82%, rgba(255, 255, 255, 1) 100%)",
                inset: 0,
                position: "absolute",
              }}
            />
            <Box
              sx={{
                bottom: 0,
                left: 0,
                p: { xs: 3, sm: 5 },
                position: "absolute",
                right: 0,
              }}
            >
              <Stack
                direction="row"
                gap={{ xs: 2, sm: 4 }}
                justifyContent="space-between"
                sx={{ alignItems: "flex-end" }}
              >
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    component="p"
                    sx={{
                      color: outgoingSlide.brandColor,
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      mb: 1,
                      textTransform: "uppercase",
                    }}
                  >
                    {outgoingSlide.brandName}
                  </Typography>
                  <Typography
                    component="p"
                    sx={{
                      fontFamily: "var(--font-literata), Georgia, serif",
                      fontSize: { xs: "1.12rem", sm: "1.3rem" },
                      lineHeight: 1.25,
                      maxWidth: "26ch",
                    }}
                  >
                    {outgoingSlide.title}
                  </Typography>
                </Box>
                <Stack
                  direction="row"
                  gap={1.5}
                  sx={{ alignItems: "center", flexShrink: 0 }}
                >
                  {outgoingSlide.marketplaces.map((marketplace) => (
                    <Box
                      key={marketplace.id}
                      sx={{
                        alignItems: "center",
                        backgroundColor: "rgba(251, 248, 240, 0.78)",
                        borderRadius: 1,
                        boxShadow: "0 8px 18px rgba(23, 34, 30, 0.1)",
                        display: "flex",
                        height: 44,
                        justifyContent: "center",
                        width: 48,
                      }}
                    >
                      <Image alt="" height={28} src={marketplace.logoSrc} width={28} />
                    </Box>
                  ))}
                </Stack>
              </Stack>
            </Box>
          </Box>
        ) : null}
        <IconButton
          aria-label="Предыдущий товар"
          onClick={showPrevious}
          sx={{
            backgroundColor: "rgba(251, 248, 240, 0.48)",
            backdropFilter: "blur(12px)",
            border: 0,
            boxShadow: "0 8px 20px rgba(23, 34, 30, 0.06)",
            color: "rgba(70, 83, 77, 0.62)",
            height: { xs: 48, sm: 60 },
            left: { xs: 12, sm: 20 },
            position: "absolute",
            top: { xs: 12, sm: 20 },
            transition: "background-color 180ms ease, transform 180ms ease",
            width: { xs: 48, sm: 60 },
            zIndex: 4,
            "& .MuiSvgIcon-root": {
              fontSize: { xs: 24, sm: 32 },
            },
            "&:hover": {
              backgroundColor: "rgba(251, 248, 240, 0.72)",
              boxShadow: "0 10px 24px rgba(23, 34, 30, 0.09)",
              color: "rgba(70, 83, 77, 0.78)",
              transform: "translateY(-2px)",
            },
            "&:active": { transform: "translateY(0) scale(0.96)" },
          }}
        >
          <ArrowBackRounded />
        </IconButton>
        <IconButton
          aria-label="Следующий товар"
          onClick={showNext}
          sx={{
            backgroundColor: "rgba(251, 248, 240, 0.48)",
            backdropFilter: "blur(12px)",
            border: 0,
            boxShadow: "0 8px 20px rgba(23, 34, 30, 0.06)",
            color: "rgba(70, 83, 77, 0.62)",
            height: { xs: 48, sm: 60 },
            position: "absolute",
            right: { xs: 12, sm: 20 },
            top: { xs: 12, sm: 20 },
            transition: "background-color 180ms ease, transform 180ms ease",
            width: { xs: 48, sm: 60 },
            zIndex: 4,
            "& .MuiSvgIcon-root": {
              fontSize: { xs: 24, sm: 32 },
            },
            "&:hover": {
              backgroundColor: "rgba(251, 248, 240, 0.72)",
              boxShadow: "0 10px 24px rgba(23, 34, 30, 0.09)",
              color: "rgba(70, 83, 77, 0.78)",
              transform: "translateY(-2px)",
            },
            "&:active": { transform: "translateY(0) scale(0.96)" },
          }}
        >
          <ArrowForwardRounded />
        </IconButton>
        <Typography
          aria-live="polite"
          aria-atomic="true"
          sx={{
            color: "rgba(23, 33, 29, 0.64)",
            fontSize: "0.68rem",
            fontWeight: 600,
            left: "50%",
            letterSpacing: "0.16em",
            position: "absolute",
            top: { xs: 26, sm: 30 },
            transform: "translateX(-50%)",
            zIndex: 4,
          }}
        >
          {String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </Typography>
        <Box
          key={`${activeSlide.id}-caption`}
          component="figcaption"
          sx={{
            animation: hasInteracted
              ? "heroCaptionIn 900ms 70ms cubic-bezier(0.42, 0, 0.58, 1) both"
              : "none",
            background:
              "linear-gradient(180deg, rgba(252, 250, 245, 0) 0%, rgba(252, 250, 245, 0.75) 24%, rgba(252, 250, 245, 0.98) 100%)",
            bottom: 0,
            left: 0,
            p: { xs: 3, sm: 5 },
            position: "absolute",
            right: 0,
            zIndex: 3,
            "@keyframes heroCaptionIn": {
              from: { opacity: 0, transform: "translateY(10px)" },
              to: { opacity: 1, transform: "translateY(0)" },
            },
            "@media (prefers-reduced-motion: reduce)": {
              animation: "none",
            },
          }}
        >
          <Stack
            direction="row"
            gap={{ xs: 2, sm: 4 }}
            justifyContent="space-between"
            sx={{ alignItems: "flex-end" }}
          >
            <Box
              aria-live="polite"
              aria-atomic="true"
              sx={{ flex: 1, minWidth: 0 }}
            >
                <Typography
                  component="p"
                  sx={{
                    color: activeSlide.brandColor,
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    mb: 1,
                    textTransform: "uppercase",
                  }}
                >
                  {activeSlide.brandName}
                </Typography>
                <Typography
                  component="p"
                  sx={{
                    fontFamily: "var(--font-literata), Georgia, serif",
                    fontSize: { xs: "1.12rem", sm: "1.3rem" },
                    lineHeight: 1.25,
                    maxWidth: "26ch",
                  }}
                >
                  {activeSlide.title}
                </Typography>
            </Box>
            <Stack
              direction="row"
              gap={1.5}
              sx={{ alignItems: "center", flexShrink: 0 }}
            >
              {activeSlide.marketplaces.map((marketplace) => (
                <MarketplaceActionButton
                  key={marketplace.id}
                  brandId={activeSlide.brandId}
                  label={marketplace.label}
                  link={marketplace.link}
                  logoOnly
                  logoSrc={marketplace.logoSrc}
                  marketplaceId={marketplace.id}
                  placement="home-hero"
                  productId={activeSlide.id}
                />
              ))}
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
