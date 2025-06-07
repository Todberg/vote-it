import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'vote-it';

  apartments: { [apt: string]: { disabled: boolean; weight: number; vote: 'yes' | 'no' | 'blank' | null } } = {
    '9, st.tv': { disabled: false, weight: 54, vote: null },
    '9, st.th': { disabled: false, weight: 88, vote: null },
    '9, 1.tv': { disabled: false, weight: 54, vote: null },
    '9, 1.th': { disabled: false, weight: 88, vote: null },
    '9, 2.tv': { disabled: false, weight: 53, vote: null },
    '9, 2.th': { disabled: false, weight: 87, vote: null },
    '9, 3.tv': { disabled: false, weight: 50, vote: null },
    '11, st.tv': { disabled: false, weight: 89, vote: null },
    '11, st.th': { disabled: false, weight: 77, vote: null },
    '11, 1.tv': { disabled: false, weight: 89, vote: null },
    '11, 1.th': { disabled: false, weight: 63, vote: null },
    '11, 2.tv': { disabled: false, weight: 89, vote: null },
    '11, 2.th': { disabled: false, weight: 63, vote: null },
    '11, 3.th': { disabled: false, weight: 56, vote: null },
  };

  apartmentKeys = Object.keys(this.apartments);

  selectedApartment: string | null = null;
  showResults = false;
  confirmVote: 'yes' | 'no' | 'blank' | null = null;

  secret = '42';
  revealInput = '';
  revealError = '';
  revealConfirmOpen = false;

  get allVoted(): boolean {
    return Object.values(this.apartments).every(apt => apt.vote !== null);
  }

  selectApartment(apt: string) {
    if (!this.apartments[apt].disabled) {
      this.selectedApartment = apt;
    }
  }

  vote(choice: 'yes' | 'no' | 'blank') {
    this.confirmVote = choice;
  }

  confirmVoteAction() {
    if (this.selectedApartment && this.confirmVote) {
      this.apartments[this.selectedApartment].disabled = true;
      this.apartments[this.selectedApartment].vote = this.confirmVote;
      this.selectedApartment = null;
      this.confirmVote = null;
    }
  }
  cancelVoteAction() {
    this.confirmVote = null;
  }

  get yesScore(): number {
    return Object.values(this.apartments)
      .filter(apt => apt.vote === 'yes')
      .reduce((sum, apt) => sum + (apt.weight || 0), 0);
  }
  get noScore(): number {
    return Object.values(this.apartments)
      .filter(apt => apt.vote === 'no')
      .reduce((sum, apt) => sum + (apt.weight || 0), 0);
  }
  get blankScore(): number {
    return Object.values(this.apartments)
      .filter(apt => apt.vote === 'blank')
      .reduce((sum, apt) => sum + (apt.weight || 0), 0);
  }

  openRevealConfirm() {
    this.revealInput = '';
    this.revealError = '';
    this.revealConfirmOpen = true;
  }
  confirmReveal() {
    if (this.revealInput === this.secret) {
      this.showResults = true;
      this.revealConfirmOpen = false;
      this.revealInput = '';
      this.revealError = '';
    } else {
      this.revealError = 'Forkert kode. Prøv igen.';
    }
  }
  cancelReveal() {
    this.revealConfirmOpen = false;
    this.revealInput = '';
    this.revealError = '';
  }
}
