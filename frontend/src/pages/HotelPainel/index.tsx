import LayoutPages from '../../layouts/LayoutPages/index';
export default function HotelPainel() {
  return (
    <>
      <LayoutPages
        ContainerIdentify="HotelPainel"
        gridArea={`" RPL LC SQ "
                   " RPL LC SQ "
                   " RPL LC SQ "`}
        gridtemplate="60% 0.1% 40%"
        bottomRPLContainer="0%"
      />
    </>
  );
}
