import LayoutPages from '../../layouts/LayoutPages/index';

export default function PainelPrincipal() {
  return (
    <>
      <LayoutPages
        ContainerIdentify="PainelPrincipal"
        gridArea={`" FEH LC SQ "
                   " RPH LC SQ "
                   " RPH LC SQ "`}
        gridtemplate="60% 0.1% 40%"
        bottomRPLContainer="10%"
      />
    </>
  );
}
