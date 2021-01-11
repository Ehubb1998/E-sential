"""bankInfo table

Revision ID: b0789838126e
Revises: 1b4ff0ddd168
Create Date: 2021-01-10 08:51:35.240225

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b0789838126e'
down_revision = '1b4ff0ddd168'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('bankInfos',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('accountBalance', sa.Integer(), nullable=False),
    sa.Column('monthlyIncome', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('bankInfos')
    # ### end Alembic commands ###