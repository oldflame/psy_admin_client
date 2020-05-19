import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import {TargetGroups} from "../../../../models/target-groups";


@Component({
  selector: 'target-groups-list',
  templateUrl: './target-groups-list.component.html',
  styleUrls: ['./target-groups-list.component.scss']
})
export class TargetGroupsListComponent implements OnInit {

  @Input("targetGroups") targetGroups: TargetGroups[];

  @Output("targetGroupDeleted") targetGroupDeleted = new EventEmitter();
  @Output("targetGroupViewed") targetGroupViewed = new EventEmitter();
  @Output("targetGroupRestored") targetGroupRestored = new EventEmitter();

  showTargetGroupsLoader = true;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.targetGroups && changes.targetGroups.currentValue != null) {
      this.showTargetGroupsLoader = false;
    }
  }

  deleteTargetGroupClicked($event: any, targetGroupID: string) {
    this.targetGroupDeleted.emit({ targetGroupID });
    $event.stopPropagation();
  }

  viewTargetGroupClicked(targetGroup: TargetGroups) {
    this.targetGroupViewed.emit({ targetGroup });
  }

  restoreTargetGroupClicked($event: any, targetGroupID: string) {
    this.targetGroupRestored.emit({ targetGroupID });
    $event.stopPropagation();
  }
}
