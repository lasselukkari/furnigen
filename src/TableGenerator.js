

import React, { useState } from 'react'
import TableView from './TableView';
import GeometryHelper from './GeometryHelper';
import * as Icon from 'react-icons/bs';

import { useControls } from 'leva'

import JSZip from 'jszip';
import FileSaver from 'file-saver';


export default function TableGenerator() {
  const apronHeight = 25;
  const [autoRotate, setAutoRotate] = useState(false);

  const [{ tabletopHeigth, tabletopWidth, tabletopLength }, setTabletop] = useControls('Top', () => ({
    tabletopHeigth: {
      label: 'Heigth',
      value: 25,
      min: 12,
      max: 40,
      step: 1,
    },
    tabletopWidth: {
      label: 'Width',
      value: 800,
      min: 520,
      max: 1000,
      step: 1,
    },
    tabletopLength: {
      label: 'Length',
      value: 1200,
      min: 520,
      max: 3200,
      step: 1,
    }
  }))

  const [{ legWidth, legLength, legMargin }, setLegs] = useControls('Legs', () => ({
    legLength: {
      label: 'Heigth',
      value: 725,
      min: 300,
      max: 1200,
      step: 1,
    },
    legWidth: {
      label: 'Width',
      value: 70,
      min: 65,
      max: 100,
      step: 1,
    },
    legMargin: {
      label: 'Margin',
      value: 55,
      min: 3,
      max: 100,
      step: 1,
    }
  }))

  const [{ apronWidth, apronMargin }, setAprons] = useControls('Aprons', () => ({
    apronWidth: {
      label: 'Heigth',
      value: 80,
      min: 65,
      max: 140,
      step: 1,
    },
    apronMargin: {
      label: 'Margin',
      value: 10,
      min: 3,
      max: (legWidth / 2),
      step: 1,
    }
  }))


  useControls({
    preset: { value: '4 person', order: -1, label:'Preset', options: ['4 person', '6 person', '8 person', 'Sofa table', 'Bar table'],     onChange: (v) => {
      if (v === '4 person') {
        setTabletop({ tabletopHeigth: 25, tabletopWidth: 800, tabletopLength: 1200 })
        setLegs({ legLength: 725, legWidth: 70, legMargin: 55 })
        setAprons({ apronWidth: 80, apronMargin: 10 })
      }
      
      if (v === '6 person') {
        setTabletop({ tabletopHeigth: 28, tabletopWidth: 850, tabletopLength: 1600 })
        setLegs({ legLength: 730, legWidth: 75, legMargin: 55 })
        setAprons({ apronWidth: 85, apronMargin: 15 })
      }

      if (v === '8 person') {
        setTabletop({ tabletopHeigth: 32, tabletopWidth: 900, tabletopLength: 2200 })
        setLegs({ legLength: 735, legWidth: 85, legMargin: 55 })
        setAprons({ apronWidth: 90, apronMargin: 20 })
      }

      if (v === 'Sofa table') {
        setTabletop({ tabletopHeigth: 25, tabletopWidth: 700, tabletopLength: 1400 })
        setLegs({ legLength: 350, legWidth: 80, legMargin: 15 })
        setAprons({ apronWidth: 80, apronMargin: 10 })
      }

      if (v === 'Bar table') {
        setTabletop({ tabletopHeigth: 25, tabletopWidth: 700, tabletopLength: 1200 })
        setLegs({ legLength: 1050, legWidth: 90, legMargin: 10 })
        setAprons({ apronWidth: 120, apronMargin: 25})
      }
    }, },
  });

  const gh = new GeometryHelper({
    tabletopHeigth,
    tabletopWidth,
    tabletopLength,
    legWidth,
    legLength,
    legMargin,
    apronWidth,
    apronHeight,
    apronMargin,
  });

  const downloadFiles = async (parts) => {
    const zip = new JSZip();
    parts.forEach(({ name, cix }) => zip.file(`${name}.cix`, cix()));
    const content = await zip.generateAsync({ type: 'blob' });
    FileSaver.saveAs(content, `Table ${new Date().toLocaleString().replaceAll('/', '-').replaceAll(':', '-').replaceAll(', ', ' ')}.zip`);
  }

  return (
    <div>

      <TableView
        tabletop={gh.tabletop()}
        aprons={gh.aprons()}
        legs={gh.legs()}
        angleSupports={gh.angleSupports()}
        middleSupport={gh.middleSupport()}
        attachments={gh.attachments()}
        autoRotate={autoRotate}
      />
      <div
        className="button"
        style={{
          top: '10px',
          left: '10px',
          position: "absolute", zIndex: 1000
        }}
        onClick={() => downloadFiles(gh.cutList())}
      >
        <Icon.BsDownload className="button-icon"/>
      </div>

      <div
        className="button"
        style={{
          bottom: '10px',
          left: '10px',
          position: "absolute", zIndex: 1000
        }}
        onClick={() => setAutoRotate(!autoRotate)}
      >
        {autoRotate ? <Icon.BsPauseFill className="button-icon"/> : <Icon.BsPlayFill className="button-icon"/>}
      </div>
    </div>
  )
}
