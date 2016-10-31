import * as AdmZip from 'adm-zip';
import * as et from 'elementtree';

import { IndexerType } from './types/indexer-type';

export class HerolabIndexer {
    public constructor(protected porfile: string) {
    }


    public run() {
        let zip = new AdmZip(this.porfile);
        var list = this.getIndexEntries(zip);
        return list;
    }


    private getIndexEntries(zip_file: AdmZip) {
        var list: IndexerType[] = [];
        var file = zip_file.getEntry('index.xml');
        var tree = et.parse(file.getData().toString('utf8'));
        var root = tree.getroot();

        // Used to avoid a strange behavior: iter() is including children elements besides the current)
        var node = root.findall('characters')[0].getchildren();

        for (var i = 0; i < node.length; i++) {
            var xml_index = node[i];
            var minions: IndexerType[];

            var data: IndexerType = {
                name: xml_index.get('name'),
                summary: xml_index.get('summary'),
                stats: <any>{}
            }
            
            xml_index.find('statblocks').iter('statblock', stat => {
                var type = stat.get('format')
                var path = `${stat.get('folder')}/${stat.get('filename')}`;

                if (/text/i.test(type)) {
                    data.stats.text = zip_file.getEntry(path).getData().toString('utf8');
                }

                if (/html/i.test(type)) {
                    data.stats.html = zip_file.getEntry(path).getData().toString('utf8');
                }

                if (/xml/i.test(type)) {
                    var xml_file = zip_file.getEntry(path).getData().toString('utf8');
                    var xml_sheet = et.parse(xml_file).getroot().find('public/character');
                    minions = this.getMinions(zip_file, xml_index, xml_sheet);

                    data.stats.xml = xml_sheet;
                }
            })

            list.push(data);

            if (minions) {
                list = list.concat(minions);
            }
        }

        return list;
    }


    private getMinions(zip_file: AdmZip, xml_index: et.Element, xml_sheet: et.Element) {
        var minions_list: IndexerType[] = [];
        var root = xml_index.find('minions');

        if (!root) return null;

        root.iter('character', item => {
            var data: IndexerType = {
                name: `${item.get('name')} (${xml_sheet.get('name')})`,
                summary: item.get('summary'),
                stats: <any>{}
            }

            item.find('statblocks').iter('statblock', stat => {
                var type = stat.get('format')
                var path = `${stat.get('folder')}/${stat.get('filename')}`;

                if (/text/i.test(type)) {
                    data.stats.text = zip_file.getEntry(path).getData().toString('utf8');;
                }
                if (/html/i.test(type)) {
                    data.stats.html = zip_file.getEntry(path).getData().toString('utf8');;
                }
            });

            // Lets go and load the useful minion xml data;
            var minions = xml_sheet.find('minions')
            data.stats.xml = minions.find('character');
            xml_sheet.remove(minions); // remove minion from Main XML

            minions_list.push(data);
        })

        return minions_list;
    }
}
