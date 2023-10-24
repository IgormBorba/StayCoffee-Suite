import { Container } from './styles';
import { ContainerLabel } from '../../components/ContainerLabel/styles';
import { LineContainer } from '../../components/LineContainer';
import FormClientExitFEH from '../../components/FormClientExitFEH';
import FullTableHotel from '../../components/FullTableHotel';
import FullTableLanchonete from '../../components/FullTableLanchonete';
import RoomSituation from '../../components/RoomSituation';
import PendenciasLanchonete from '../../components/PendenciasLanchonete';
import RegistrosLanchonete from '../../components/RegistrosLanchonete';
import RegistrosHotel from '../../components/RegistrosHotel';

interface TypeGridItems {
  gridArea?: string;
  gridtemplate?: string;
  bottomRPLContainer?: string;
  ContainerIdentify?: string;
}

export default function LayoutPages({
  gridArea,
  gridtemplate,
  bottomRPLContainer,
  ContainerIdentify,
}: TypeGridItems) {
  const isAreaVisible = (area: string) => {
    return gridArea?.split(' ').includes(area);
  };

  function ControllerReturn(container: string, area: string) {
    switch (container) {
      case 'PainelPrincipal':
        switch (area) {
          case 'FEH':
            return <RegistrosHotel />;
          case 'RPH':
            return <RegistrosLanchonete />;
          case 'SQ':
            return <RoomSituation />;
        }
        break;
      case 'HotelPainel':
        switch (area) {
          case 'RPL':
            return <FormClientExitFEH />;
          case 'SQ':
            return <PendenciasLanchonete />;
        }
        break;
      case 'HotelHistorico':
        switch (area) {
          case 'SQ':
            return <FullTableHotel />;
        }
        break;
      case 'LanchoneteHistorico':
      case 'SQ':
        return <FullTableLanchonete />;
      default:
        return null;
    }
  }

  return (
    <>
      <Container gridArea={gridArea} gridtemplate={gridtemplate}>
        {isAreaVisible('FEH') && ContainerIdentify && (
          <ContainerLabel grid="FEH" background=" #e9e9e9">
            {ControllerReturn(ContainerIdentify, 'FEH')}
          </ContainerLabel>
        )}
        {isAreaVisible('RPH') && ContainerIdentify && (
          <ContainerLabel grid="RPH" background=" #e9e9e9">
            {ControllerReturn(ContainerIdentify, 'RPH')}
          </ContainerLabel>
        )}
        {isAreaVisible('RPL') && ContainerIdentify && (
          <ContainerLabel
            grid="RPL"
            background=" #e9e9e9"
            bottom={bottomRPLContainer || '100px'}
          >
            {ControllerReturn(ContainerIdentify, 'RPL')}
          </ContainerLabel>
        )}
        {isAreaVisible('LC') && <LineContainer grid="LC" />}
        {isAreaVisible('SQ') && ContainerIdentify && (
          <ContainerLabel grid="SQ" background="transparent">
            {ControllerReturn(ContainerIdentify, 'SQ')}
          </ContainerLabel>
        )}
      </Container>
    </>
  );
}
