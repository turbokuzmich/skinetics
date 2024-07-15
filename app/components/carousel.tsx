import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ArrowBack from "@mui/icons-material/ArrowBackIos";
import ArrowForward from "@mui/icons-material/ArrowForwardIos";
import CircularProgress from "@mui/material/CircularProgress";
import A from "@mui/material/Link";
import Link from "next/link";
import Player from "react-player/file";
import Color from "color";
import { Carousel } from "react-responsive-carousel";
import { Theme } from "@mui/material";
import debounce from "lodash/debounce";
import {
  useEffect,
  useState,
  useMemo,
  createContext,
  useContext,
  useCallback,
  forwardRef,
  ReactNode,
  MouseEventHandler,
} from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css";

const PlayerReadinessContext = createContext(false);
const PlayerCenterContext = createContext(false);

const originalVideoProportion = 770 / 2600;

const playerSize = {
  width: "100vmax",
  height: `${originalVideoProportion * 100}vmax`,
};

const videoData = [
  {
    index: 1,
  },
  {
    index: 2,
  },
  {
    index: 3,
  },
  {
    index: 4,
  },
];

const getNextSlideIndex = (currentIndex: number) =>
  (currentIndex + 1) % videoData.length;

const PlayerWrapper = forwardRef(function PlayerWrapper(
  { children, index }: Readonly<{ children: ReactNode; index: number }>,
  ref
) {
  const isPlayerReady = useContext(PlayerReadinessContext);
  const shouldCenterVideo = useContext(PlayerCenterContext);

  return (
    <Box
      ref={ref}
      sx={{
        width: playerSize.width,
        height: playerSize.height,
        pointerEvents: "none",
        position: "relative",
        backgroundImage: `url(/images/carousel/${index}.jpg)`,
        backgroundSize: "contain",
        ...(shouldCenterVideo
          ? {
              "& > video": {
                transform: "translateX(calc(50vw - 50vmax))",
              },
            }
          : {}),
      }}
    >
      <>
        {children}
        {isPlayerReady ? null : (
          <Box
            sx={{
              top: 0,
              left: 0,
              width: "100vw",
              height: playerSize.height,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress size={100} />
          </Box>
        )}
      </>
    </Box>
  );
});

export default function MainCarousel() {
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [canShowCarousel, setCanShowCarousel] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [shouldCenterVideo, setShouldCenterVideo] = useState(false);

  const wrappers = useMemo(
    () =>
      videoData.map(({ index }) =>
        forwardRef(function IndexedPlayerWrapper(
          props: { children: ReactNode },
          ref
        ) {
          return <PlayerWrapper index={index} ref={ref} {...props} />;
        })
      ),
    []
  );

  const onPlayerReady = useCallback(
    () => setIsPlayerReady(true),
    [setIsPlayerReady]
  );

  const onSlideChanged = useCallback(
    (index: number) => setSlideIndex(index),
    [setSlideIndex]
  );

  const renderPrev = useCallback(
    (onClick: MouseEventHandler) => <CarouselArrow onClick={onClick} />,
    [slideIndex]
  );

  const renderNext = useCallback(
    (onClick: MouseEventHandler) => <CarouselArrow onClick={onClick} forward />,
    [slideIndex]
  );

  const onEnded = useCallback(() => {
    setSlideIndex(getNextSlideIndex(slideIndex));
  }, [slideIndex, setSlideIndex]);

  useEffect(() => setCanShowCarousel(true), [setCanShowCarousel]);

  useEffect(() => {
    function calcVideoOffset() {
      setShouldCenterVideo(window.innerWidth / window.innerHeight < 1);
    }

    calcVideoOffset();

    const reCalcVideoOffset = debounce(calcVideoOffset, 500);

    window.addEventListener("resize", reCalcVideoOffset);

    return () => {
      window.removeEventListener("resize", reCalcVideoOffset);
    };
  }, [setShouldCenterVideo]);

  return canShowCarousel ? (
    <PlayerReadinessContext.Provider value={isPlayerReady}>
      <PlayerCenterContext.Provider value={shouldCenterVideo}>
        <Box
          sx={(theme) => ({
            pt: 12,
            "& .carousel-arrow .carousel-arrow-control": {
              backgroundColor: Color(theme.palette.grey["900"])
                .alpha(0.5)
                .rgb()
                .string(),
            },
            "& .carousel-arrow:hover .carousel-arrow-control, &:hover .carousel-arrow:hover .carousel-arrow-control":
              {
                backgroundColor: Color(theme.palette.grey["900"])
                  .alpha(0.3)
                  .rgb()
                  .string(),
              },
            "&:hover .carousel-arrow .carousel-arrow-control": {
              opacity: 1,
              transform: "translate(0, 0)",
            },
          })}
        >
          <Carousel
            className="video-carousel"
            autoPlay={false}
            transitionTime={1200}
            showArrows={false}
            showStatus={false}
            showThumbs={false}
            showIndicators={false}
            selectedItem={slideIndex}
            onChange={onSlideChanged}
            renderArrowPrev={renderPrev}
            renderArrowNext={renderNext}
            emulateTouch
          >
            {videoData.map(({ index }, idx) => (
              <Link key={index} href="/" passHref>
                <A
                  sx={{
                    display: "block",
                    width: "100%",
                    height: playerSize.height,
                    overflow: "hidden",
                  }}
                >
                  <Player
                    onEnded={onEnded}
                    onReady={idx === 0 ? onPlayerReady : undefined}
                    playing={idx === slideIndex}
                    url={`/video/${index}.mp4`}
                    width={playerSize.width}
                    height={playerSize.height}
                    wrapper={wrappers[idx]}
                    muted
                  />
                </A>
              </Link>
            ))}
          </Carousel>
        </Box>
      </PlayerCenterContext.Provider>
    </PlayerReadinessContext.Provider>
  ) : (
    <Box
      sx={{
        width: playerSize.width,
        height: playerSize.height,
      }}
    />
  );
}

function CarouselArrow({
  onClick,
  forward = false,
}: {
  onClick: MouseEventHandler;
  forward?: boolean;
}) {
  const isPlayerReady = useContext(PlayerReadinessContext);

  const containerStyles = useCallback(
    (theme: Theme) => ({
      position: "absolute",
      zIndex: 100,
      top: "50%",
      transform: "translateY(-50%)",
      left: forward ? "initial" : theme.spacing(4),
      right: forward ? theme.spacing(4) : "initial",
      cursor: "pointer",
      flexDirection: "column",
      alignItems: forward ? "flex-end" : "flex-start",
      display: {
        xs: "none",
        md: "flex",
      },
    }),
    []
  );

  const buttonStyles = useMemo(
    () => ({
      color: "common.white",
      width: 100,
      height: 100,
      mb: 4,
      opacity: 0,
      transform: `translate(${forward ? "10px" : "-10px"}, 0)`,
      transition: [
        "background-color 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
        "opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
        "transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
      ].join(","),
    }),
    [forward]
  );

  return isPlayerReady ? (
    <Box className="carousel-arrow" onClick={onClick} sx={containerStyles}>
      <IconButton
        className="carousel-arrow-control carousel-arrow-button"
        sx={buttonStyles}
        disableRipple
      >
        {forward ? <ArrowForward /> : <ArrowBack />}
      </IconButton>
    </Box>
  ) : null;
}
